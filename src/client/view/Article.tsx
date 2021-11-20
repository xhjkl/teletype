/** @jsx createElement */
/** @jsxFrag Fragment */
import { Fragment, createElement } from 'react'

import ArticleHeader from './ArticleHeader'
import ArticleAuthor from './ArticleAuthor'
import ArticleHeroImage from './ArticleHeroImage'
import ArticleBody from './ArticleBody'

type Props = {
  title?: string
  author?: string
  imageAddress?: string
  publicationDate?: string
  body?: string
}

export default ({
  title,
  author,
  imageAddress,
  publicationDate,
  body,
}: Props) => {
  return (
    <>
      <div className='row mid' />
      <div className='row mid' />
      <ArticleHeader>{title}</ArticleHeader>
      <ArticleAuthor name={author} date={publicationDate} />
      <ArticleHeroImage src={imageAddress} />
      <ArticleBody>{body}</ArticleBody>
    </>
  )
}
