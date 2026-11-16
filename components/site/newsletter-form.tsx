"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { EASE_OUT_QUINT } from "@/lib/motion";

/**
 * Newsletter signup (UI only for now: nothing is sent anywhere).
 * Wire `onSubmit` to the mailing-list provider when one is chosen.
 */
export function NewsletterForm() {
  const id = useId();
  const [done, setDone] = useState(false);

  return (
    <div className="grid">
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.p
            key="done"
            role="status"
            className="[grid-area:1/1] self-center font-serif text-xl text-[#f6f3ea]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_QUINT }}
          >
            Thank you! Farm notes are on their way.
          </motion.p>
        ) : (
          <motion.form
            key="form"
            className="[grid-area:1/1] flex flex-col gap-3 sm:flex-row"
            exit={{ opacity: 0, y: -10, transition: { duration: 0.25 } }}
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
          >
            <label htmlFor={id} className="sr-only">
              Email address
            </label>
            <input
              id={id}
              type="email"
              required
              autoComplete="email"
              placeholder="Your email address"
              className="h-12 w-full min-w-0 rounded-full border border-white/20 bg-white/10 px-5 text-[15px] text-[#f6f3ea] placeholder:text-[#f6f3ea]/55 outline-none transition-colors focus:border-white/50 focus:bg-white/15 sm:flex-1"
            />
            <Button
              type="submit"
              className="h-12 shrink-0 rounded-full bg-[#f6f3ea] px-7 text-[15px] font-medium text-primary hover:bg-white"
            >
              Subscribe
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
