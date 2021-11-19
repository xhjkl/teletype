import type { ArticleContent } from './types'

/** Map an Article Content to that with an abbreviated form of its body. */
export default (x: ArticleContent) => {
  if (x.body == null) {
    return x
  }

  const [bodyBeforeCut] = x.body!.split('\n\n', 1)
  x.excerpt =
    bodyBeforeCut.length < 128 ? bodyBeforeCut : x.body.slice(0, 120) + '...'
  return x
}
