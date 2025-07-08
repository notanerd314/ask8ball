/** 
 * Collapsible details component
 * @param title - The title text for the collapsible header
 * @param children - Content to display when expanded
 * @param className - Additional CSS classes
 * @param props - Additional HTML attributes
 * @returns JSX element with collapsible functionality
 */
export default function Collapsible({ title, children, className, ...props }: { title: string, children: React.ReactNode, className?: string, props?: any }) {
  return (
    <details className={"bg-slate-200 dark:bg-slate-900 rounded-md p-2 " + className} {...props}>
      <summary className="w-full p-3 shadow-lg cursor-pointer bg-slate-200 dark:bg-slate-900 rounded-md">
        {title}
      </summary>
      <div className="w-full p-4 mt-1 shadow-lg bg-slate-100 dark:bg-slate-800/60 rounded-md">
        {children}
      </div>
    </details>
  )
}