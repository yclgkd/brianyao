export default function Footer({
  className,
  children
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <footer className={`my-5 flex flex-row flex-wrap items-center justify-center ${className}`}>
      <p>Powered by Brian Yao</p>
      {children}
    </footer>
  )
}
