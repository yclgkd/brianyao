import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

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
        <Head title="Brian's Blog">
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
        <body className="bg-white text-slate-500 dark:bg-slate-900 dark:text-slate-400">
          <Main />
          <NextScript />
        </body>
        <body>
          <div id="#__gatsby">
            <slot />
          </div>
        </body>
      </Html>
    )
  }
}

export default MyDocument
