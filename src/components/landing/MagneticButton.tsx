import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "ref"> {
  variant?: "primary" | "ghost";
  children: ReactNode;
}

export function MagneticButton({ children, variant = "primary", className, ...props }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={cn(
        "magnetic-btn relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-medium text-sm tracking-wide transition-colors",
        variant === "primary"
          ? "text-white shadow-premium glow-blue"
          : "glass text-white/90 hover:text-white",
        className
      )}
      {...(props as Record<string, unknown>)}
    >
      {variant === "primary" && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-full -z-10"
          style={{ background: "var(--gradient-brand)" }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
