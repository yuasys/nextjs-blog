import remark from 'remark'
import html from 'remark-html'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  //  /posts直下のファイル名を取得
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // idを取得するに、ファイル名から「.md」を削除
    const id = fileName.replace(/\.md$/, '')

    // mdファイルを文字列として読み込む
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Ugray-matterを使ってpostのメタデータ部を解析
    const matterResult = matter(fileContents)

    // データと id を組み合わせる
    return {
      id,
      ...matterResult.data
    }
  })
  // 投稿を日付順に並べ替える
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // 投稿のメタデータ部を解析するために、gray-matterを使う
  const matterResult = matter(fileContents)

  // 'remark'を使ってmarkdownからHTML文字列へ変換する
  const processedContent = await remark().use(html).process(matterResult.content)
  const contentHtml = processedContent.toString()

  // idとcontentHTML、dataを組み合わせる
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}