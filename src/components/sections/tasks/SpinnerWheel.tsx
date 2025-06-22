import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

const segments = [
  "$1",
  "Try Again",
  "$20",
  "$5",
  "Spin Again",
  "$1000",
  "$0",
  "$300",
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

export default function SpinnerWheel() {
  const controls = useAnimation();
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [angle, setAngle] = useState(0);

  const spin = async () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const segmentAngle = 360 / segments.length;
    const selectedIndex = Math.floor(Math.random() * segments.length);

    const fullSpins = 5;
    const targetAngle =
      fullSpins * 360 + selectedIndex * segmentAngle + segmentAngle / 2;

    setAngle(targetAngle);

    await controls.start({
      rotate: targetAngle,
      transition: { duration: 3, ease: "easeInOut" },
    });

    setTimeout(() => {
      setResult(segments[selectedIndex]);
      setSpinning(false);
    }, 3100);
  };

  console.log(angle);

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
            Spin
          </span>
        </div>
      </motion.div>

      <button
        onClick={spin}
        disabled={spinning}
        className="mt-6 px-6 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
      >
        {spinning ? "Spinning..." : "Spin Now"}
      </button>

      {result && (
        <motion.div
          className="mt-6 text-2xl font-bold text-green-700"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          🎉 You got: {result}
        </motion.div>
      )}
    </div>
  );
}
