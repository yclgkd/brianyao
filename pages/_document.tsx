import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import Script from 'next/script'
import * as Config from '@/config'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang={Config.BLOG_LANG}>
        <Head>
          <meta charSet="utf-8" />
          <meta name="author" content={Config.BLOG_AUTHOR} />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#2d89ef" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="generator" content="Gatsby 4.7.2" />
          <meta name="generator" content="Wordpress 6.0.2" />
          <meta name="generator" content="WooCommerce 3.7.2" />
          <link
            rel="alternate"
            type="application/rss+xml"
            title={Config.BLOG_TITLE}
            href="/rss.xml"
          />
        </Head>
        <body className="bg-white text-slate-500 dark:bg-slate-900 dark:text-slate-300">
          <Script
            id="blog-theme"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function() {
                if (
                  localStorage.theme === 'dark' ||
                  (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
                ) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              })()`
            }}
          />
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-13ZEYYNWD9"
            strategy="afterInteractive"
          />
          <Script
            id="blog-ga"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-13ZEYYNWD9');`
            }}
          />
          <Main />
          <NextScript />
          <div id="#__gatsby">
            <slot />
          </div>
        </body>
      </Html>
    )
  }
}

export default MyDocument
