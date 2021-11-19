import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'

import ControlCenter from './ControlCenter'

import { ArticleContent } from '../../lib/types'

import Article from '../view/Article'

const article = gql`
  query Article($id: String) {
    article(id: $id) {
      id
      title
      author
      imageAddress
      publicationDate
      body
    }
  }
`

export default () => {
  const { articleId: id } = useParams()

  const { error, loading, data } = useQuery<{
    article: ArticleContent
  }>(article, {
    variables: { id },
    pollInterval: 200 + 200 * Math.random(),
  })

  const navigate = useNavigate()

  React.useEffect(() => {
    if (!error && !loading && data?.article == null) {
      // Perhaps this article has been deleted while we were reading it,
      // or it never existed.
      navigate('/', { replace: true })
    }
  }, [error, loading, data])

  if (error) {
    throw error
  }

  if (loading || data?.article == null) {
    return null
  }

  return (
    <>
      <ControlCenter />
      <Article {...data.article} />
    </>
  )
}
