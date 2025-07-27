export default function Logo({ color, size }: { color?: string, size?: number }) {
  return (
    <p
      className="font-bold true-comic"
      style={{ color, fontSize: size || 60 }}
    >
      not
      <span className="font-normal">a</span>
      nerd
    </p>
  );
}
