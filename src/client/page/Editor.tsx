import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { gql, useQuery, useMutation } from '@apollo/client'

import { ArticleContent } from '../../lib/types'
import { isContentValid } from '../../lib/validate'

import Editor from '../view/Editor'

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

const excerpts = gql`
  query Excerpts {
    allArticles {
      id
      title
      author
      imageAddress
      publicationDate
      excerpt
    }
  }
`

const create = gql`
  mutation CreateArticle(
    $title: String!
    $author: String!
    $imageAddress: String
    $body: String!
  ) {
    createArticle(
      title: $title
      author: $author
      imageAddress: $imageAddress
      body: $body
    ) {
      id
    }
  }
`

const update = gql`
  mutation UpdateArticle(
    $id: String!
    $title: String!
    $author: String!
    $imageAddress: String
    $body: String!
  ) {
    updateArticle(
      id: $id
      title: $title
      author: $author
      imageAddress: $imageAddress
      body: $body
    ) {
      id
    }
  }
`

const remove = gql`
  mutation RemoveArticle($id: String!) {
    removeArticle(id: $id) {
      id
    }
  }
`

export default () => {
  const { articleId: id } = useParams()
  const navigate = useNavigate()

  const { error, loading, data } = useQuery<{
    article: ArticleContent
  }>(article, {
    variables: { id },
  })

  const onCompleted = React.useCallback((data) => {
    const newId = data?.createArticle?.id ?? data?.updateArticle?.id
    if (newId != null) {
      navigate(`/article/${newId}`)
    } else {
      navigate('/')
    }
  }, [])

  const [doCreate] = useMutation(create, {
    refetchQueries: 'all',
    onCompleted,
  })
  const [doUpdate] = useMutation(update, {
    refetchQueries: 'all',
    update: (cache) => cache.evict({ broadcast: true }),
    onCompleted,
  })
  const [doRemove] = useMutation(remove, {
    refetchQueries: 'all',
    update: (cache) => cache.evict({ broadcast: true }),
    onCompleted,
  })

  const [shouldShowWarnings, setShouldShowWarnings] = React.useState(false)
  const handleSubmit = React.useCallback(
    (
      actionKind: 'create' | 'update' | 'remove',
      title: string,
      author: string,
      imageAddress: string,
      body: string
    ) => {
      if (actionKind !== 'remove' && !isContentValid(title, author, body)) {
        setShouldShowWarnings(true)
        setTimeout(() => {
          setShouldShowWarnings(false)
        }, 4096)

        return
      }

      switch (actionKind) {
        case 'create':
          doCreate({
            variables: {
              title,
              author,
              imageAddress,
              body,
            },
          })
          break
        case 'update':
          doUpdate({
            variables: {
              id,
              title,
              author,
              imageAddress,
              body,
            },
          })
          break
        case 'remove':
          doRemove({
            variables: { id },
          })
          break
      }
    },
    [id, doCreate, doUpdate, doRemove]
  )

  return (
    <Editor
      defaultTitle={data?.article?.title}
      defaultAuthor={data?.article?.author}
      defaultHeroImageAddress={data?.article?.imageAddress}
      defaultBody={data?.article?.body}
      couldCreate={id == null}
      couldUpdate={id != null}
      couldRemove={id != null}
      shouldShowWarnings={shouldShowWarnings}
      onSubmit={handleSubmit}
    />
  )
}
