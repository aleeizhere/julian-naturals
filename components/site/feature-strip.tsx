import type { SVGProps } from "react";
import { LeafIcon, MountainIcon, UsersIcon } from "lucide-react";

/** Mortar & pestle line icon (lucide has none), matched to lucide's 24px / 1.5 stroke style. */
function MortarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M2.5 11h19" />
      <path d="M3.5 11a8.5 8.5 0 0 0 17 0" />
      <path d="M8.5 19.5 8 21.5h8l-.5-2" />
      <path d="M12.5 11 17.5 3.2a1.4 1.4 0 0 1 2.3 1.6L14.5 11" />
    </svg>
  );
}

const FEATURES = [
  { icon: LeafIcon, label: ["All-Natural", "Ingredients"] },
  { icon: MortarIcon, label: ["Handcrafted", "in Small Batches"] },
  { icon: UsersIcon, label: ["Family-", "Owned"] },
  { icon: MountainIcon, label: ["Julian,", "California"] },
] as const;

export function FeatureStrip() {
  return (
    <div data-feature-strip className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
      <ul className="grid grid-cols-2 gap-y-8 border-t border-olive/15 py-8 md:grid-cols-4 md:py-10">
        {FEATURES.map(({ icon: Icon, label }, i) => (
          <li
            key={label.join(" ")}
            data-feature-item
            className={`flex flex-col items-center gap-3 text-center ${
              i > 0 ? "md:border-l md:border-olive/15" : ""
            }`}
          >
            <Icon className="size-9 text-primary md:size-10" strokeWidth={1.25} />
            <p className="text-[15px] leading-snug text-foreground md:text-[17px]">
              {label[0]}
              <br />
              {label[1]}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
