import type { Metadata } from "next";
import { Jost, Lora } from "next/font/google";
import { Background } from "@/components/site/background";
import { MotionProvider } from "@/components/site/motion-provider";
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
      <body className="relative min-h-full flex flex-col overflow-x-clip">
        <MotionProvider>
          <Background />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
