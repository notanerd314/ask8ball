import React from "react";

export default function ShelfSection({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <section className={className}>
      <div className="relative z-10 max-w-full px-10 grid grid-flow-col auto-cols-max gap-5">
        {children}
      </div>
      <img
        src="/shelf.webp"
        alt="Shelf"
        loading="lazy"
        className="z-0 w-full drop-shadow-2xl -translate-y-8"
      />
    </section>
  )
}