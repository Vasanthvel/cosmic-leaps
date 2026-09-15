"use client";

import { useState } from "react";

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
}

export function FlipCard({
  front,
  back,
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  function toggleFlip() {
    setFlipped((prev) => !prev);
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLDivElement>
  ) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleFlip();
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={toggleFlip}
      onKeyDown={handleKeyDown}
      aria-pressed={flipped}
      className="group h-[360px] cursor-pointer [perspective:1200px]"
    >
      <div
        className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <div className="absolute inset-0 [backface-visibility:hidden]">
          {front}
        </div>

        <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          {back}
        </div>
      </div>
    </div>
  );
}