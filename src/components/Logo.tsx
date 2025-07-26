export default function Logo({ color, size }: { color?: string, size?: number }) {
  return (
    <p
      className="text-center font-bold font-comic hover:scale-105 transition-all"
      style={{ color, fontSize: size || 60 }}
    >
      not
      <span className="font-normal">a</span>
      nerd
    </p>
  );
}
