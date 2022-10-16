export function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={`my-5 mt-auto flex flex-row flex-wrap items-center justify-center pt-10 text-sm ${
        className || ''
      }`}
    >
      <p>
        Powered by{' '}
        <a
          href="https://github.com/yclgkd"
          className="hover:text-gray-700 dark:hover:text-gray-100"
        >
          Brian Yao
        </a>
      </p>
    </footer>
  )
}
