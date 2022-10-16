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
          <meta name="generator" content="Gatsby 4.7.2" />
          <meta name="generator" content="Wordpress 6.0.2" />
          <meta name="generator" content="WooCommerce 3.7.2" />
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
