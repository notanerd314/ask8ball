export default function Collapsible({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <details className="bg-black/50 p-4 rounded-2xl text-left">
      <summary className="cursor-pointer font-bold text-lg">{title}</summary>
      <div className="mt-1.5">{children}</div>
    </details>
  );
}