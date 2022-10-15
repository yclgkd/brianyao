import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import Script from 'next/script'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const meta = {
      twitterUsername: 'yclgkd',
      author: 'Brian Yao',
      title: "Brian Yao's Blog",
      description: "Brian Yao's Blog",
      image: 'https://brianyao.tech/images/avatar.jpeg'
    }

    return (
      <Html lang="en">
        <Head title={`Brian Yao's Blog`}>
          <meta charSet="utf-8" />
          <meta name="author" content="Brian Yao" />
          <meta name="robots" content="follow, index" />
          <meta name="description" content={meta.description} />
          <meta property="og:site_name" content={meta.title} />
          <meta property="og:description" content={meta.description} />
          <meta property="og:title" content={meta.title} />
          <meta property="og:image" content={meta.image} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content={`@${meta.twitterUsername}`} />
          <meta name="twitter:title" content={meta.title} />
          <meta name="twitter:description" content={meta.description} />
          <meta name="twitter:image" content={meta.image} />
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
            strategy="lazyOnload"
          />
          <Script
            id="blog-ga"
            strategy="lazyOnload"
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
