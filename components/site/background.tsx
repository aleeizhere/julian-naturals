/**
 * Fixed decorative layer that sits behind the page and gives the gradient
 * a soft, glassy depth. The blobs are plain divs so they can be swapped for
 * `motion.div` later to drift slowly.
 */
export function Background() {
  return (
    <div
      aria-hidden
      data-bg-layer
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        data-bg-blob="top-right"
        className="absolute -top-40 -right-32 size-[38rem] rounded-full bg-olive/12 blur-3xl"
      />
      <div
        data-bg-blob="bottom-left"
        className="absolute -bottom-48 -left-40 size-[34rem] rounded-full bg-olive-200/50 blur-3xl"
      />
      <div
        data-bg-blob="center"
        className="absolute top-1/3 left-1/3 size-[28rem] rounded-full bg-white/70 blur-3xl"
      />
      {/* faint glass sheen */}
      <div className="absolute inset-0 bg-linear-to-b from-white/40 via-transparent to-white/20" />
    </div>
  );
}
