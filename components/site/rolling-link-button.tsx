"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";

import { RollingText } from "@/components/animate-ui/primitives/texts/rolling";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Primary pill CTA: olive, rounded, label rolls (animate-ui RollingText)
 * on hover / keyboard focus and the arrow nudges right.
 */
export function RollingLinkButton({
  href,
  children,
  className,
}: {
  href: string;
  children: string;
  className?: string;
}) {
  const [active, setActive] = useState(false);

  return (
    <Button
      asChild
      size="lg"
      className={cn(
        "h-14 w-full rounded-full px-9 text-[17px] font-normal shadow-[0_10px_30px_-10px_rgb(63_90_42/0.6)] sm:w-auto",
        className,
      )}
    >
      <Link
        href={href}
        onPointerEnter={() => setActive(true)}
        onPointerLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
      >
        <RollingText
          text={children}
          active={active}
          flipDelay={0.12}
          transition={{ duration: 0.28, delay: 0.018, ease: "easeOut" }}
        />
        <motion.span
          aria-hidden
          className="inline-flex"
          animate={{ x: active ? 4 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <ArrowRightIcon className="size-5" strokeWidth={1.5} />
        </motion.span>
      </Link>
    </Button>
  );
}
