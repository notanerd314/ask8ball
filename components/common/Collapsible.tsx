export default function Collapsible({ title, children, className, ...props }: { title: string, children: React.ReactNode, className?: string, props?: any }) {
  return (
    <details className={"bg-slate-200 dark:bg-slate-900 rounded-md p-2 " + className} {...props}>
      <summary className="cursor-pointer w-full bg-slate-200 dark:bg-slate-900 p-3 rounded-md shadow-lg">
        {title}
      </summary>
      <div className="w-full bg-slate-100 dark:bg-slate-800/60 shadow-lg p-4 rounded-md mt-1">
        {children}
      </div>
    </details>
  )
}