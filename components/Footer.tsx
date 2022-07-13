export function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={`my-5 mt-auto flex flex-row flex-wrap items-center justify-center pt-10 text-sm ${className}`}
    >
      <p>Powered by Brian Yao</p>
    </footer>
  )
}
