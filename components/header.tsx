export default function header({
  className,
  children
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <header className={`my-5 ${className}`}>
      <h1 className="text-2xl font-bold">Brian Yao</h1>
      {children}
    </header>
  )
}
