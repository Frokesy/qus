import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../../../stores/useAuthStore";
import { supabase } from "../../../utils/supabaseClient";

const segments = [
  "$1",
  "Try Again",
  "$8",
  "$6",
  "Spin Again",
  "$10",
  "$12",
  "$3",
];

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
  frozen_balance: string;
  total_earnings: string;
};

export default function SpinnerWheel() {
  const controls = useAnimation();
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [angle, setAngle] = useState(0);
  const { user, fetchSession } = useAuthStore();

  const spin = async () => {
    if (spinning || !user || user.free_spins <= 0) return;

    setSpinning(true);
    setResult(null);

    const segmentAngle = 360 / segments.length;
    const selectedIndex = Math.floor(Math.random() * segments.length);
    const selectedValue = segments[selectedIndex];
    const fullSpins = 5;

    const targetAngle =
      fullSpins * 360 + selectedIndex * segmentAngle + segmentAngle / 2;

    setAngle(targetAngle);
    console.log(angle);
    await controls.start({
      rotate: targetAngle,
      transition: { duration: 3, ease: "easeInOut" },
    });

    setTimeout(async () => {
      setResult(selectedValue);

      const updates: SpinUpdates = {
        free_spins: user.free_spins - 1,
        last_spin_at: new Date().toISOString(),
        frozen_balance: user.frozen_balance || "0",
        total_earnings: user.total_earnings || "0",
      };

      if (selectedValue.startsWith("$")) {
        const amount = parseFloat(selectedValue.replace("$", ""));
        if (!isNaN(amount)) {
          if (amount > 5) {
            const forty = amount * 0.4;
            const sixty = amount * 0.6;
            updates.total_earnings = (
              parseFloat(user.total_earnings || "0") + forty
            ).toFixed(2);
            updates.frozen_balance = (
              (parseFloat(user.frozen_balance || "0") || 0) + sixty
            ).toFixed(2);
          } else {
            updates.total_earnings = (
              parseFloat(user.total_earnings || "0") + amount
            ).toFixed(2);
          }
        }
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

  return (
    <div className="flex flex-col items-center justify-center py-10 relative">
      <div className="absolute top-[30px] rotate-180 z-10 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[25px] border-l-transparent border-r-transparent border-b-red-600" />

      <motion.div
        animate={controls}
        className="w-[300px] h-[300px] rounded-full border-8 border-white shadow-xl relative overflow-hidden"
        style={{
          background: `conic-gradient(${segments
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
          : "Come back tomorrow"}
      </button>

      {result && (
        <motion.div
          className={`mt-6 text-2xl font-bold text-center ${
            result.startsWith("$") ? "text-green-700" : "text-red-600"
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {result.startsWith("$") ? (
            <>
              🎉 Congrats! You won <span className="underline">{result}</span>!
            </>
          ) : (
            <>😢 {result === "Try Again" ? "No luck! Try again." : result}</>
          )}
        </motion.div>
      )}
    </div>
  );
}
