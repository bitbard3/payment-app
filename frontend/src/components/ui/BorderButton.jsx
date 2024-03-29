import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionTemplate,
  useTransform,
} from "framer-motion";
import { cn } from "@/utils/cn";
export function Button({
  borderRadius = "1.75rem",
  children,
  containerClassName,
  borderClassName,
  duration,
  className,
  loadingChildren,
  onClick,
  disabled,
  ...otherProps
}) {
  const screenX = window.innerWidth;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "bg-transparent  relative text-xl w-32  h-12 lg:w-40 p-[1px] overflow-hidden border border-yellow border-opacity-70 md:border-0",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0 hidden lg:block"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {screenX > "1023" ? (
          <MovingBorder duration={duration} rx="30%" ry="30%">
            <div
              className={cn(
                "h-20 w-20 opacity-[0.8] bg-[radial-gradient(var(--yellow)_40%,transparent_60%)]",
                borderClassName
              )}
            />
          </MovingBorder>
        ) : (
          ``
        )}
      </div>

      <div
        className={cn(
          "relative bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased z-10",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {disabled && loadingChildren}
        {children}
      </div>
    </button>
  );
}

export const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
  ...otherProps
}) => {
  const pathRef = useRef();
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y
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
        {...otherProps}
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
