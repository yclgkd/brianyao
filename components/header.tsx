export default function header({className, children}: {className?: string, children?: React.ReactNode}) {
  return (
    <header className={`my-5 ${className}`}>
      <h1 className="font-bold text-2xl">Brian Yao</h1>
      {children}
    </header>)
}
