'use client';

import * as React from 'react';
import { motion, type Transition } from 'motion/react';

import {
  useIsInView,
  type UseIsInViewOptions,
} from '@/hooks/use-is-in-view';

const formatCharacter = (char: string) => (char === ' ' ? '\u00A0' : char);

const CHAR_STYLE: React.CSSProperties = {
  position: 'absolute',
  display: 'inline-block',
  backfaceVisibility: 'hidden',
};

type RollingTextProps = Omit<React.ComponentProps<'span'>, 'children'> & {
  text: string;
  transition?: Transition;
  delay?: number;
  /**
   * Controlled mode (e.g. hover). When set, the text rolls to the second
   * face while `true` and rolls back while `false`, instead of playing once
   * on mount / in view.
   */
  active?: boolean;
  /** Seconds between a letter's outgoing and incoming face. */
  flipDelay?: number;
} & UseIsInViewOptions;

function RollingText({
  ref,
  text,
  inView = false,
  inViewMargin = '0px',
  inViewOnce = true,
  transition = { duration: 0.5, delay: 0.1, ease: 'easeOut' },
  delay = 0,
  active,
  flipDelay = 0.3,
  ...props
}: RollingTextProps) {
  const { ref: localRef, isInView } = useIsInView(
    ref as React.Ref<HTMLElement>,
    {
      inView,
      inViewOnce,
      inViewMargin,
    },
  );

  const parts = React.useMemo(() => text.split(/(\s+)/), [text]);
  const stepDelay = transition?.delay ?? 0;
  const controlled = active !== undefined;
  const rolled = controlled ? active : isInView;

  let charIdx = 0;

  return (
    <span ref={localRef} data-slot="rolling-text" {...props}>
      {parts.map((part, wi) => {
        if (/^\s+$/.test(part)) {
          return <span key={`space-${wi}`}>{part}</span>;
        }

        const chars = Array.from(part);
        return (
          <span
            key={`word-${wi}`}
            style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
          >
            {chars.map((char, ci) => {
              const thisIdx = charIdx++;
              const charDelay = delay / 1000 + thisIdx * stepDelay;
              return (
                <span
                  key={`c-${wi}-${ci}`}
                  style={{
                    position: 'relative',
                    display: 'inline-block',
                    perspective: '9999999px',
                    transformStyle: 'preserve-3d',
                    width: 'auto',
                  }}
                  aria-hidden="true"
                >
                  <motion.span
                    style={{
                      ...CHAR_STYLE,
                      transformOrigin: '50% 25%',
                    }}
                    initial={{ rotateX: 0 }}
                    animate={
                      controlled
                        ? { rotateX: rolled ? 90 : 0 }
                        : rolled
                          ? { rotateX: 90 }
                          : undefined
                    }
                    transition={{
                      ...transition,
                      // rolling back: this face returns after the other leaves
                      delay: rolled ? charDelay : charDelay + flipDelay,
                    }}
                  >
                    {formatCharacter(char)}
                  </motion.span>
                  <motion.span
                    style={{
                      ...CHAR_STYLE,
                      transformOrigin: '50% 100%',
                    }}
                    initial={{ rotateX: 90 }}
                    animate={
                      controlled
                        ? { rotateX: rolled ? 0 : 90 }
                        : rolled
                          ? { rotateX: 0 }
                          : undefined
                    }
                    transition={{
                      ...transition,
                      delay: rolled ? charDelay + flipDelay : charDelay,
                    }}
                  >
                    {formatCharacter(char)}
                  </motion.span>
                  <span style={{ visibility: 'hidden' }}>
                    {formatCharacter(char)}
                  </span>
                </span>
              );
            })}
          </span>
        );
      })}

      <span className="sr-only">{text}</span>
    </span>
  );
}

export { RollingText, type RollingTextProps };
