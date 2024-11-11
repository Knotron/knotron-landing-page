import React from "react";
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

// Helper function for className merging since we can't use the utils
const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

interface BorderImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  borderRadius?: string;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
}

interface MovingBorderProps {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
}

export function BorderImage({
  src,
  alt,
  width = 1199,
  height = 891,
  borderRadius = "0.25rem",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: BorderImageProps) {
  return (
    <div
      className={cn(
        "bg-transparent relative overflow-hidden",
        containerClassName || ""
      )}
      style={{
        borderRadius: borderRadius,
        width: width,
        height: height,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="0%" ry="0%">
          <div
            className={cn(
              "h-20 w-20 opacity-[0.5] bg-[radial-gradient(var(--sky-500)_40%,transparent_60%)]",
              borderClassName || ""
            )}
          />
        </MovingBorder>
      </div>
      <div
        className={cn(
          "relative border p-[1.1px] border-[#191c26] backdrop-blur-xl w-full h-full overflow-hidden",
          className || ""
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        <img 
          src={src} 
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

const MovingBorder = ({
  children,
  duration = 10000,
  rx,
  ry,
}: MovingBorderProps) => {
  const pathRef = useRef<SVGRectElement | null>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val)?.x ?? 0
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val)?.y ?? 0
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default BorderImage;