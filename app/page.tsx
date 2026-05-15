"use client";
import Link from "next/link";
import Image from "next/image";

type CardProps = {
  icon: string;
  title: string;
  desc: string;
  color: string;
};

function Card({ icon, title, desc, color }: CardProps) {
  return (
    <div className="bg-white text-center rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer w-full max-w-[200px] sm:max-w-[220px] md:max-w-[240px] lg:max-w-[260px] xl:max-w-[280px] py-6 px-4 sm:py-7 sm:px-5 md:py-8 md:px-6">
      <div
        className={`w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto flex items-center justify-center rounded-full ${color}`}
      >
        <Image
          src={icon}
          alt={title}
          width={28}
          height={28}
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
        />
      </div>

      <h3 className="mt-3 md:mt-4 text-lg sm:text-xl md:text-2xl font-semibold text-red-600">
        {title}
      </h3>

      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500 mt-1">
        {desc}
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f2b4a9] via-[#e48f86] to-[#c63d3d] text-white px-4 py-10 sm:py-12 md:py-16">
      
      {/* Header */}
      <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14 max-w-4xl w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold drop-shadow-md flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 leading-tight">
          <span>💄</span>
          <span>Makeup Memory Game</span>
        </h1>
        <p className="mt-6 sm:mt-8 md:mt-10 lg:mt-14 xl:mt-20 mb-2 text-base sm:text-lg md:text-xl lg:text-2xl opacity-90 px-2">
          Match the pairs and discover beauty tips!
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-row flex-wrap gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 justify-center w-full max-w-5xl">
        <Link href="/game/easy">
          <Card
            icon="/icons/easy.svg"
            title="Easy"
            desc="2×3 Grid - 3 Pairs"
            color="bg-pink-300"
          />
        </Link>

        <Link href="/game/medium">
          <Card
            icon="/icons/med.svg"
            title="Medium"
            desc="4×4 Grid - 8 Pairs"
            color="bg-red-400"
          />
        </Link>

        <Link href="/game/hard">
          <Card
            icon="/icons/hard.svg"
            title="Hard"
            desc="5×4 Grid - 10 Pairs"
            color="bg-red-600"
          />
        </Link>
      </div>

      {/* Footer text */}
      <p className="mt-8 sm:mt-10 md:mt-12 text-sm sm:text-base md:text-lg lg:text-xl opacity-80 text-center">
        Select a difficulty level to begin
      </p>
    </div>
  );
}