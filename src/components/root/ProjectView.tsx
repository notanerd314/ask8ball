import Link from "next/link";

export default function ProjectView(
  { href, img, title }: { href: string, img: string, title: string },
) {
  return (
    <Link href={href} title={title} className="hover:scale-105 active:scale-102 transition-all rounded-3xl shadow-2xl">
      <img
        src={img}
        alt={title}
        className="h-auto object-contain rounded-3xl border-6 bg-white"
      />
    </Link>
  );
}
