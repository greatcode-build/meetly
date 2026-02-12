"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface HomeCardProps {
  img: string;
  title: string;
  description: string;
  handleClick: () => void;
  className: string;
}

const HomeCard = ({
  img,
  title,
  description,
  handleClick,
  className,
}: HomeCardProps) => {
  return (
    <div
      className={cn(
        "px-4 py-6 flex flex-col justify-between w-full xl:max-w-67.5 min-h-65 rounded-[14px] cursor-pointer",
        className
      )}
      onClick={handleClick}
    >
      <div className="flex justify-center items-center size-12 glassmorphism rounded-[10px]">
        <Image
          src={img}
          alt="meeting"
          width={27}
          height={27}
          className="h-auto w-auto"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-bold">{description}</p>
      </div>
    </div>
  );
};

export { HomeCard };
