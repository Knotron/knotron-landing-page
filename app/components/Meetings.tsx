"use client";

import { cn } from "@/utils/cn";
import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconListCheck,
  IconNotebook,
  IconSignature,
  IconTableColumn,
  IconVideo,
} from "@tabler/icons-react";
import BorderImage from "./ui/moving-border";

export function BentoGridSecondDemo() {
  return (
    <div className="space-y-8 bg-black py-24 md:py-32">
      <div className="flex flex-col items-center text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-arial text-[#f2f5f9]">Fully Autonomous Meetings</h1>
        <p className="text-lg md:text-2xl font-arial text-[#c1c3d0]">Get in, be present, and let AI take care of the rest</p>
      </div>

      <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={cn(item.className, "border-2px border-[#191c26]")}
            icon={item.icon}
          />
        ))}
      </BentoGrid>
    </div>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent bg-[neutral-100]"></div>
);

const items = [
  {
    title: "Notes & Summary",
    description: "Notes that highlight all the details + a summary",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl">
        <img
          alt="M"
          src="/skeleton1.svg"
          className="object-contain w-full h-full min-h-[6rem] rounded-xl"
        />
      </div>
    ),
    className: "md:col-span-2",
    icon: <IconNotebook className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Joins Your Meetings",
    description: "Scans your calendar, and joins on autopilot",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl">
        <img
          alt="M"
          src="/skeleton2.svg"
          className="object-contain w-full h-full min-h-[6rem] rounded-xl"
        />
      </div>
    ),
    className: "md:col-span-1",
    icon: <IconVideo className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Transcript",
    description: "Every word said, who said it, and when",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl">
        <img
          alt="M"
          src="/skeleton3.svg"
          className="object-contain w-full h-full min-h-[6rem] rounded-xl"
        />
      </div>
    ),
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Action Items",
    description:
      "Get reminders for tasks mentioned in meetings",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl">
          <img
            alt="M"
            src="/skeleton4.svg"
            className="object-contain w-full h-full min-h-[6rem] rounded-xl"
          />
        </div>
      ),
    className: "md:col-span-2",
    icon: <IconListCheck className="h-4 w-4 text-neutral-500" />,
  },
];