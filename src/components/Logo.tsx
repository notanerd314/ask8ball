import { Comic_Neue } from "next/font/google";

const font = Comic_Neue({ subsets: ["latin"], display: "swap", weight: "700" });

export default function Logo({ color }: { color?: string }) {
  return (
    <strong
      className={font.className}
      style={{ color, fontSize: "5rem", WebkitTextStroke: `0.04em ${color || "white"}` }}
    >
      not
      <span className="inline-block font-normal rotate-4">a</span>
      nerd
    </strong>
  );
}
