import type { Metadata } from "next";
import { Jost, Lora } from "next/font/google";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CartProvider } from "@/components/cart/cart-context";
import { Background } from "@/components/site/background";
import { Footer } from "@/components/site/footer";
import { MotionProvider } from "@/components/site/motion-provider";
import { Navbar } from "@/components/site/navbar";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Julian Naturals — Truly Natural Body Care",
  description:
    "Handcrafted in small batches using natural ingredients from our family farm in Julian, California.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${lora.variable} h-full antialiased`}
    >
      {/* suppressHydrationWarning: browser extensions (e.g. ColorZilla) add
          attributes to <body> before React hydrates. Only affects <body>'s
          own attributes, not its children. */}
      <body
        suppressHydrationWarning
        className="relative min-h-full flex flex-col overflow-x-clip"
      >
        <MotionProvider>
          <CartProvider>
            <Background />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
