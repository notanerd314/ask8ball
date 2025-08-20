import { Comic_Neue } from "next/font/google";

const font = Comic_Neue({ subsets: ["latin"], display: "swap", weight: "700" });

export default function Logo({ color, size }: { color?: string, size?: number }) {
  return (
    <strong
      className={font.className}
      style={{ color, fontSize: size || 60, WebkitTextStroke: `2.5px ${color || "white"}` }}
    >
      not
      <span className="inline-block font-normal rotate-4">a</span>
      nerd
    </strong>
  );
}
