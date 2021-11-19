import * as React from 'react'

import { ArticleContent } from '../../lib/types'

import ArticleHeader from './ArticleHeader'
import ArticleAuthor from './ArticleAuthor'
import ArticleHeroImage from './ArticleHeroImage'
import ArticleBody from './ArticleBody'

export default ({
  title,
  author,
  imageAddress,
  publicationDate,
  body,
}: ArticleContent) => {
  return (
    <>
      <div className='row mid' />
      <ArticleHeader>{title}</ArticleHeader>
      <ArticleAuthor name={author} date={publicationDate} />
      <ArticleHeroImage src={imageAddress} />
      <ArticleBody>{body}</ArticleBody>
    </>
  )
}
