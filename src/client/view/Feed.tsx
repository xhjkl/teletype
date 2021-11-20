/** @jsx createElement */
import { createElement } from 'react'
import { Link } from 'react-router-dom'

import ArticleHeader from './ArticleHeader'
import ArticleAuthor from './ArticleAuthor'
import ArticleHeroImage from './ArticleHeroImage'
import ArticleBody from './ArticleBody'

import type { ArticleContent } from '../../lib/types'

type Props = {
  articles?: Array<ArticleContent>
}

export default ({ articles = [] }: Props) => (
  <div className='feed container'>
    {articles.map(
      ({ id, title, author, publicationDate, imageAddress, excerpt }) => (
        <Link to={`/article/${id}`} key={id}>
          <div className='feed article'>
            <ArticleHeader children={title} />
            <ArticleAuthor name={author} date={publicationDate} />
            <ArticleHeroImage src={imageAddress} />
            <ArticleBody children={excerpt} />
          </div>
        </Link>
      )
    )}
  </div>
)
