export default function ProjectView(
  { href, img, title }: { href: string, img: string, title: string },
) {
  return (
    <a href={href} title={title} className="hover:scale-105 hover:shadow-2xl active:scale-102 transition-all rounded-3xl">
      <img
        src={img}
        alt={title}
        className="h-auto object-contain rounded-3xl border-4"
      />
    </a>
  );
}
