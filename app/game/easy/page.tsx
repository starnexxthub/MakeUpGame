"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type CardType = {
  id: number;
  value: string;
  flipped: boolean;
  matched: boolean;
};

export default function EasyGame() {
  const router = useRouter();
  const [showTip, setShowTip] = useState(false);
  const [currentTip, setCurrentTip] = useState<{ title: string; desc: string } | null>(null);

  const beautyTips: Record<string, { title: string; desc: string }> = {
    "/icons/smiley.svg": {
      title: "Mascara Pro Tip",
      desc: "Wiggle the mascara wand...",
    },
    "/icons/eye.svg": {
      title: "Nail Care Tip",
      desc: "Apply cuticle oil daily...",
    },
    "/icons/heart.svg": {
      title: "Skin Glow Tip",
      desc: "Cleanse and moisturize...",
    },
  };

  const initialCards = ["/icons/heart.svg", "/icons/smiley.svg", "/icons/eye.svg"];

  const shuffled = [...initialCards, ...initialCards]
    .sort(() => Math.random() - 0.5)
    .map((val, i) => ({ id: i, value: val, flipped: false, matched: false }));

  const [cards, setCards] = useState<CardType[]>(shuffled);
  const [selected, setSelected] = useState<CardType[]>([]);
  const [moves, setMoves] = useState(0);
  const [pairs, setPairs] = useState(0);
  const [time, setTime] = useState(0);
  const isGameWon = pairs === initialCards.length;

  useEffect(() => {
    if (isGameWon) return;
    const interval = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [isGameWon]);

  const handleFlip = (card: CardType) => {
    if (card.flipped || card.matched || selected.length === 2) return;

    const updated = cards.map((c) => (c.id === card.id ? { ...c, flipped: true } : c));
    setCards(updated);

    const newSelected = [...selected, card];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newSelected;

      if (first.value === second.value) {
        setPairs((p) => p + 1);
        setCards((prev) =>
          prev.map((c) => (c.value === first.value ? { ...c, matched: true } : c))
        );
        setCurrentTip(beautyTips[first.value]);
        setShowTip(true);
        setSelected([]);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id ? { ...c, flipped: false } : c
            )
          );
          setSelected([]);
        }, 800);
      }
    }
  };

  const formatTime = (t: number) => {
    const m = String(Math.floor(t / 60)).padStart(2, "0");
    const s = String(t % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const resetGame = () => window.location.reload();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f2b4a9] via-[#e48f86] to-[#c63d3d] text-white px-3 sm:px-4 md:px-6 py-8 sm:py-10">

      {/* Title */}
      <div className="text-center mb-6 sm:mb-8 md:mb-10 max-w-3xl w-full">
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
          💄 Makeup Memory Game
        </h1>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-xl lg:text-2xl opacity-90">
          Match the pairs and discover beauty tips!
        </p>
      </div>

      {/* Stats Bar */}
      <div className="bg-white/80 backdrop-blur-md text-red-600 rounded-xl shadow-md px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 lg:gap-10 mb-6 sm:mb-8 md:mb-10 w-full max-w-2xl lg:max-w-4xl xl:max-w-5xl justify-between">
        <div className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          <Stat label="Time" value={formatTime(time)} />
          <Stat label="Moves" value={moves} />
          <Stat label="Pairs" value={`${pairs}/3`} />
        </div>

        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-red-500 to-pink-300 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-md hover:opacity-90 text-sm sm:text-base md:text-lg lg:text-xl font-medium"
          >
            New Game
          </button>
          <button
            onClick={() => router.push("/")}
            className="bg-white border border-red-300 text-red-500 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-sm hover:bg-red-50 text-sm sm:text-base md:text-lg lg:text-xl font-medium"
          >
            Home
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleFlip(card)}
            className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105
              ${card.flipped || card.matched
                ? "bg-white text-black shadow-md"
                : "bg-gradient-to-br from-red-500 to-pink-200 text-white"
              }`}
          >
            {card.flipped || card.matched ? (
              <Image
                src={card.value}
                alt="card"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12"
              />
            ) : (
              <span className="text-lg sm:text-xl md:text-2xl">💄</span>
            )}
          </div>
        ))}
      </div>

      {/* Win Banner */}
      {isGameWon && (
        <div className="mt-8 sm:mt-10 md:mt-12 w-full max-w-2xl lg:max-w-4xl xl:max-w-5xl bg-green-500 rounded-2xl p-4 sm:p-5 md:p-6 text-center shadow-lg">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white flex items-center justify-center gap-2">
            🎉 Congratulations! 🎉
          </h2>
          <p className="text-white mt-2 text-sm sm:text-base md:text-lg lg:text-xl">
            You completed the game in {moves} moves and {formatTime(time)}!
          </p>
          <div className="flex justify-center gap-3 sm:gap-4 mt-4 sm:mt-5 md:mt-6">
            <button
              onClick={resetGame}
              className="bg-white text-green-600 px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg font-medium shadow text-sm sm:text-base md:text-lg"
            >
              Play Again
            </button>
            <button
              onClick={() => router.push("/")}
              className="bg-green-400 text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg font-medium shadow text-sm sm:text-base md:text-lg"
            >
              Change Difficulty
            </button>
          </div>
        </div>
      )}

      {/* Beauty Tip Modal */}
      {showTip && currentTip && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
          <div className="bg-[#f3d4cd] rounded-2xl shadow-xl p-4 sm:p-5 md:p-6 w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px] relative border border-red-200">
            <button
              onClick={() => setShowTip(false)}
              className="absolute top-3 right-4 text-red-400 text-lg sm:text-xl"
            >
              ✕
            </button>

            <h2 className="text-red-500 font-bold text-lg sm:text-xl md:text-2xl flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
              <Image src="/icons/sparkle.svg" alt="tip icon" width={28} height={28} className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
              Beauty Tip!
            </h2>

            <h3 className="font-semibold text-base sm:text-lg md:text-xl text-red-600">
              {currentTip.title}
            </h3>

            <p className="text-red-500 text-base sm:text-lg md:text-xl lg:text-2xl mt-2 leading-relaxed">
              {currentTip.desc}
            </p>

            <button
              onClick={() => setShowTip(false)}
              className="mt-4 sm:mt-5 md:mt-6 w-full py-2 sm:py-2.5 md:py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-300 text-white font-medium text-base sm:text-lg md:text-xl shadow-md hover:opacity-90"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="text-center">
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">{value}</p>
      <p className="text-xs sm:text-sm md:text-base lg:text-lg text-red-400">{label}</p>
    </div>
  );
}