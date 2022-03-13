export default function Footer({className, children}: {className?: string, children?: React.ReactNode}) {
  return (
    <footer className={`flex justify-center flex-row flex-wrap items-center my-5 ${className}`}>
      <p>Powered by Brian Yao</p>
      {children}
    </footer>
  )
}
