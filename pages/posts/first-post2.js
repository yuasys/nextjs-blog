import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'

export default function FirstPost() {
  return (
    <>
    <Layout>
      <Head>
        <title>初めての投稿</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
      <style jsx>{`
      // ここにCSSを記述する
      h1 {
        color: pink;
      }
      `}</style>
      </Layout>
  </>

  )
}