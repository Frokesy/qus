const promoTexts = [
  "🤑 Joe just won $50 from a free spin!",
  "🎯 Ada earned $15 completing a quiz.",
  "🚀 Ahmed withdrew $120 from his wallet.",
  "📷 Funke completed the photo task.",
  "💰 Michael referred 5 friends and earned $25.",
  "🎉 Jane hit the jackpot: $70 in one spin!",
  "🏆 Kwame scored 10/10 on the logic quiz.",
  "⏳ Tola's ID verification is complete — $100 released.",
  "🎥 Chidi submitted a video task and got paid.",
  "📦 Damilola completed 3 tasks today!",
];

const PromoTickerBar = () => {
  return (
    <div className="w-full bg-blue-800 py-2 border-b shadow-sm z-50 fixed top-0 left-0 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee space-x-8 px-4">
        {promoTexts.map((text, idx) => (
          <span
            key={idx}
            className="text-sm text-gray-700 font-medium border px-3 py-1 rounded-full border-gray-300 bg-gray-50 shadow-sm"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PromoTickerBar;
