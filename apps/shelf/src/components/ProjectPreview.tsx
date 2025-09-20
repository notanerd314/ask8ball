import Image from "next/image";

export function ProjectPreview(
  { href, img, title }: { href: string, img: string, title: string },
) {
  return (
    <a href={href} title={title} className="hover:scale-105 active:scale-102 transition-all rounded-xl max-w-70">
      <Image
        src={img}
        alt={title}
        loading="lazy"
        width={1200}
        height={630}
        className="object-contain h-auto shadow-2xl rounded-xl"
        style={{ borderColor: "rgba(255,255,255,0.5)", borderWidth: "0.2rem", borderStyle: "solid" }}
      />
    </a>
  );
}

export function Placeholder() {
  return (
    <div className="rounded-3xl aspect-[1.91/1]" />
  )
}