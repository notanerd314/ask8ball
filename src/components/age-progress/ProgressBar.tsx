export default function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="h-34 w-5xl rotate-90 xl:rotate-0 rounded-4xl bg-gray-200 border-gray-200 border-14">
      <div className="h-full rounded-4xl bg-green-400" style={{ width: `${percent}%` }} />
      <div className="h-full w-1 rounded-full bg-black -translate-y-full"></div>
    </div>
  );
}
