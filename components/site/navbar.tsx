"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, ShoppingCartIcon, UserIcon } from "lucide-react";

import { AnimatePresence, motion } from "motion/react";

import { useCart } from "@/components/cart/cart-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/animate-ui/components/radix/sheet";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/our-story" },
  { label: "Products", href: "/shop" },
  { label: "CBD Collection", href: "/cbd-collection" },
] as const;

/**
 * logo.png has generous transparent padding around the wordmark.
 * This crops to the wordmark (≈15–85.5% x, ≈21–78% y) with percentage
 * offsets, so it scales with the wrapper width.
 */
function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Julian Naturals — home"
      data-nav-logo
      className={`relative block aspect-[1490/424] overflow-hidden ${className}`}
    >
      <Image
        src="/logo.png"
        alt="Julian Naturals"
        width={2112}
        height={744}
        sizes="240px"
        loading="eager"
        className="absolute top-[-36.8%] left-[-21.3%] h-auto w-[141.8%] max-w-none"
      />
    </Link>
  );
}

function CartButton() {
  const { count, setOpen } = useCart();
  return (
    <Button
      variant="ghost"
      size="icon-lg"
      aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
      aria-haspopup="dialog"
      onClick={() => setOpen(true)}
      className="relative rounded-full"
    >
      <ShoppingCartIcon className="size-[22px]" strokeWidth={1.5} />
      <span
        data-cart-count
        className="absolute top-0.5 right-0.5 grid size-[18px] place-items-center overflow-hidden rounded-full bg-primary text-[10px] font-medium text-primary-foreground"
      >
        {/* count pops in when it changes */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={count}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {count > 99 ? "99+" : count}
          </motion.span>
        </AnimatePresence>
      </span>
    </Button>
  );
}

/**
 * Page links are current on their own path and on pages beneath it
 * ("/shop" stays active on "/shop/after-shave-balm"); hash links never are.
 */
function isCurrent(href: string, pathname: string) {
  if (href.includes("#")) return false;
  return href === pathname || (href !== "/" && pathname.startsWith(`${href}/`));
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <header
      data-navbar
      className="sticky top-0 z-40 border-b border-white/60 bg-white/45 backdrop-blur-xl supports-[backdrop-filter]:bg-white/35"
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 md:h-20 lg:px-10">
        <Logo className="w-[132px] sm:w-[150px] lg:w-[168px]" />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8 lg:gap-14">
            {NAV_LINKS.map((link) => (
              <li key={link.label} data-nav-item>
                <Link
                  href={link.href}
                  aria-current={isCurrent(link.href, pathname) ? "page" : undefined}
                  className="relative text-[15px] text-foreground/90 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform hover:text-primary hover:after:scale-x-100 aria-[current=page]:text-primary aria-[current=page]:after:scale-x-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label="Account"
            className="hidden rounded-full sm:inline-flex"
          >
            <UserIcon className="size-[22px]" strokeWidth={1.5} />
          </Button>
          <CartButton />

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-lg"
                aria-label="Open menu"
                className="rounded-full md:hidden"
              >
                <MenuIcon className="size-[22px]" strokeWidth={1.5} />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85vw] max-w-sm border-white/70 bg-white/85 backdrop-blur-2xl"
            >
              <SheetHeader className="px-6 pt-6">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <Logo className="w-[132px]" />
              </SheetHeader>
              <nav aria-label="Mobile" className="px-6">
                <ul className="flex flex-col">
                  {NAV_LINKS.map((link) => (
                    <li key={link.label} className="border-b border-olive/10">
                      <SheetClose asChild>
                        <Link
                          href={link.href}
                          aria-current={isCurrent(link.href, pathname) ? "page" : undefined}
                          className={cn(
                            "block py-4 font-serif text-2xl text-foreground transition-colors hover:text-primary",
                            "aria-[current=page]:text-primary",
                          )}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-auto px-6 pb-8">
                <Button variant="outline" className="w-full rounded-full bg-white/60">
                  <UserIcon strokeWidth={1.5} /> Account
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
