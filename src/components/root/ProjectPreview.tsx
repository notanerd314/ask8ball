export function ProjectPreview(
  { href, img, title }: { href: string, img: string, title: string },
) {
  return (
    <a href={href} title={title} className="hover:scale-105 active:scale-102 transition-all rounded-3xl max-w-60">
      <img
        src={img}
        alt={title}
        loading="lazy"
        className="object-contain h-auto border-4 rounded-3xl"
      />
    </a>
  );
}

export function Placeholder() {
  return (
    <div className="rounded-3xl aspect-[1.91/1]" />
  )
}