import { MouseEvent, useEffect, useRef } from 'react'
import Link from 'next/link'

export function Header({ className }: { className?: string }) {
  const theme = useRef('light')
  useEffect(() => {
    const darkModeInLocalStorage = localStorage.theme === 'dark'
    const darkModeInMediaQuery =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const darkMode = darkModeInLocalStorage || darkModeInMediaQuery
    theme.current = darkMode ? 'dark' : 'light'
  }, [])
  // change dark mode event
  const changeDarkMode = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    theme.current = theme.current === 'light' ? 'dark' : 'light'
    // set dark mode in local storage
    localStorage.theme = theme.current
    if (theme.current === 'light') {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }
  return (
    <header className={`mt-5 flex items-center justify-between py-5 ${className || ''}`}>
      <Link href={'/'}>
        <a className="mb-0 cursor-pointer text-3xl font-bold">Brian Yao</a>
      </Link>
      <div className="flex flex-row flex-wrap items-center justify-between space-x-2">
        <button
          className="relative flex cursor-pointer items-center justify-center"
          onClick={changeDarkMode}
        >
          <span className="absolute right-0 top-0 -translate-x-1/2 -translate-y-1/2 -rotate-180 transform-gpu opacity-0 transition duration-300 ease-in-out dark:rotate-0 dark:opacity-100">
            <svg
              role="img"
              aria-label="dark mode"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span className="absolute right-0 top-0 -translate-x-1/2 -translate-y-1/2 rotate-0 transform-gpu transition duration-300 ease-in-out dark:-rotate-180 dark:opacity-0">
            <svg
              role="img"
              aria-label="light mode"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
          </span>
        </button>
        <a className="hidden lg:inline-block" aria-label="feed" href="/rss.xml" target="_blank">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </a>
      </div>
    </header>
  )
}
