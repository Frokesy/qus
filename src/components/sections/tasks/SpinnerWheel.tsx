import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../../stores/useAuthStore";
import { supabase } from "../../../utils/supabaseClient";

const colors = [
  "#fde68a",
  "#fca5a5",
  "#a5f3fc",
  "#c4b5fd",
  "#bbf7d0",
  "#fcd34d",
  "#f9a8d4",
  "#86efac",
];

type SpinUpdates = {
  free_spins: number;
  last_spin_at: string;
  special_bonus: string;
};

export default function SpinnerWheel() {
  const controls = useAnimation();
  const [spinning, setSpinning] = useState(false);
  const [segments, setSegments] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [angle, setAngle] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user, fetchSession } = useAuthStore();

  useEffect(() => {
    const fetchSegments = async () => {
      const { data, error } = await supabase.from("spins").select("*").single();

      if (error || !data) {
        console.error("Failed to fetch spin segments:", error?.message);
        setSegments([
          "Try Again",
          "Try Again",
          "Try Again",
          "Try Again",
          "Try Again",
          "Try Again",
          "Try Again",
          "Try Again",
        ]);
      } else {
        const fetched = Array.from({ length: 8 }, (_, i) => {
          const val = data[`side_${i + 1}`];
          return val && val !== "0" ? val : "Try Again";
        });
        setSegments(fetched);
      }

      setLoading(false);
    };

    fetchSegments();
  }, []);

  const spin = async () => {
    if (spinning || !user || user.free_spins <= 0) return;

    setSpinning(true);
    setResult(null);

    const segmentAngle = 360 / segments.length;
    const selectedIndex = Math.floor(Math.random() * segments.length);
    const selectedValue = segments[selectedIndex];
    const fullSpins = 5;
    console.log(angle);

    const targetAngle =
      fullSpins * 360 + selectedIndex * segmentAngle + segmentAngle / 2;

    setAngle(targetAngle);

    await controls.start({
      rotate: targetAngle,
      transition: { duration: 3, ease: "easeInOut" },
    });

    setTimeout(async () => {
      setResult(selectedValue);

      const updates: SpinUpdates = {
        free_spins: user.free_spins - 1,
        last_spin_at: new Date().toISOString(),
        special_bonus: user.special_bonus || "0",
      };

      const reward = parseFloat(selectedValue);

      if (!isNaN(reward) && reward > 0) {
        updates.special_bonus = (
          parseFloat(user.special_bonus || "0") + reward
        ).toFixed(2);
      }

      const { error } = await supabase
        .from("users")
        .update(updates)
        .eq("user_id", user.user_id);

      if (error) {
        console.error("Failed to update user after spin:", error.message);
      } else {
        await fetchSession();
      }

      await controls.start({
        rotate: 0,
        transition: { duration: 0.1 },
      });

      setAngle(0);
      setSpinning(false);
    }, 1000);

    setTimeout(() => {
      setResult("");
    }, 3000);
  };

  const canSpin = user && user.free_spins > 0;

  const getHoursUntilNextSpin = (): number => {
    if (!user?.last_spin_at) return 0;
    const lastSpin = new Date(user.last_spin_at);
    const nextDay = new Date(lastSpin);
    nextDay.setDate(lastSpin.getDate() + 2);
    const hours = Math.ceil(
      (nextDay.getTime() - Date.now()) / (1000 * 60 * 60),
    );
    return hours > 0 ? hours : 0;
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 relative">
      <div className="absolute top-[30px] rotate-180 z-10 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[25px] border-l-transparent border-r-transparent border-b-red-600" />

      <motion.div
        animate={controls}
        className="w-[300px] h-[300px] rounded-full border-8 border-white shadow-xl relative overflow-hidden"
        style={{
          background: loading
            ? "#ccc"
            : `conic-gradient(${segments
                .map(
                  (_, i) =>
                    `${colors[i % colors.length]} ${(i * 100) / segments.length}% ${((i + 1) * 100) / segments.length}%`,
                )
                .join(", ")})`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-semibold text-white bg-black/50 px-4 py-2 rounded-full">
            Spins left ({user?.free_spins})
          </span>
        </div>
      </motion.div>

      <button
        onClick={spin}
        disabled={spinning || !canSpin}
        className="mt-6 px-6 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
      >
        {canSpin
          ? spinning
            ? "Spinning..."
            : "Spin Now"
          : `You can spin again in ${getHoursUntilNextSpin()} hour(s)`}
      </button>

      {result && (
        <motion.div
          className={`mt-6 text-2xl font-bold text-center ${
            parseFloat(result) > 0 ? "text-green-700" : "text-red-600"
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {parseFloat(result) > 0 ? (
            <>
              🎉 Congrats! You won <span className="underline">${result}</span>!
            </>
          ) : (
            <>😢 {result === "Try Again" ? "No luck! Try again." : result}</>
          )}
        </motion.div>
      )}
    </div>
  );
}
