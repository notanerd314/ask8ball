import { Comic_Neue } from "next/font/google";

const font = Comic_Neue({ subsets: ["latin"], display: "swap", weight: "700" });

export default function Logo({ color }: { color?: string }) {
  return (
    <strong
      className={font.className}
      style={{ color, fontSize: "4rem", WebkitTextStroke: `0.03em ${color || "black"}` }}
    >
      not
      <span className="inline-block rotate-4">a</span>
      nerd
    </strong>
  );
}
