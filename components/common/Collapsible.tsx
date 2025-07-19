export default function Collapsible({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <details className="glass-dark !p-6 !rounded-3xl text-left hover:bg-black/70 transition-all duration-300">
      <summary className="cursor-pointer font-black text-xl text-white hover:text-yellow-400 transition-colors duration-300">{title}</summary>
      <div className="mt-4 text-white/90">{children}</div>
    </details>
  );
}