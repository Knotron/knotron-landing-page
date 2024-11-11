"use client";
import React, { useState } from "react";
import { Button } from "./ui/moving-border-button";
import { WaitlistModal } from "./ui/WaitlistModal";

export function MovingBorderDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Button
        borderRadius="1rem"
        className="bg-[#191c26] text-white border-[#191c26] font-silkscreen"
        onClick={() => setIsModalOpen(true)}
      >
        Join Waitlist
      </Button>

      <WaitlistModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
}