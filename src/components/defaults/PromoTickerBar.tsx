import { useEffect, useState } from "react";

const originalPromoTexts = [
  "🤑 Luca just won $50 from a free spin!",
  "🎯 Amelia earned $15 completing a quiz.",
  "🚀 Theo withdrew $120 from his wallet.",
  "📷 Sofia completed the photo task.",
  "💰 Emil referred 5 friends and earned $25.",
  "🎉 Anna hit the jackpot: $70 in one spin!",
  "🏆 Leon scored 10/10 on the logic quiz.",
  "⏳ Isak's ID verification is complete — $100 released.",
  "🎥 Hugo submitted a video task and got paid.",
  "📦 Clara completed 3 tasks today!",
  "🤑 Elias just won $75 from a free spin!",
  "🎯 Lea earned $10 completing a survey.",
  "🚀 Mikkel withdrew $220 from his wallet.",
  "📷 Mathilde uploaded a product photo.",
  "💰 Andreas invited 3 friends and got $15.",
  "🎉 Ingrid spun the wheel and won $40!",
  "🏆 Bjorn passed the math challenge!",
  "⏳ Felix's KYC is verified — $80 released.",
  "🎥 Lukas submitted a YouTube review task.",
  "📦 Sofia did 5 tasks in one day!",
  "🤑 Niko just won $100 from a mega spin!",
  "🎯 Emma nailed the history quiz!",
  "🚀 Paul withdrew $200 to PayPal.",
  "📷 Freja completed a live event task.",
  "💰 Hanna earned $60 referring new users.",
  "🎉 Anton scored a lucky bonus of $90!",
  "🏆 Erik got top marks on today's quiz.",
  "⏳ Nora's photo ID was approved.",
  "🎥 Emilie recorded a feedback video.",
  "📦 Viktor completed the spin & earn task.",
];

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const PromoTickerBar = () => {
  const [promoTexts, setPromoTexts] = useState<string[]>([]);

  useEffect(() => {
    setPromoTexts(shuffleArray(originalPromoTexts));
  }, []);

  return (
    <div className="w-full bg-blue-800 py-2 border-b shadow-sm z-50 fixed top-0 left-0 overflow-hidden">
      <div className="relative w-full">
        <div className="flex whitespace-nowrap animate-marquee space-x-8 px-4">
          {promoTexts.map((text, idx) => (
            <span
              key={`promo-1-${idx}`}
              className="text-sm text-gray-700 font-medium border px-3 py-1 rounded-full border-gray-300 bg-gray-50 shadow-sm"
            >
              {text}
            </span>
          ))}
          {promoTexts.map((text, idx) => (
            <span
              key={`promo-2-${idx}`}
              className="text-sm text-gray-700 font-medium border px-3 py-1 rounded-full border-gray-300 bg-gray-50 shadow-sm"
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoTickerBar;
