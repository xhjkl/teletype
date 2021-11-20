/** @jsx createElement */
import { createElement, useCallback, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'

import {
  Article,
  CreateArticle,
  RemoveArticle,
  UpdateArticle,
} from '../../lib/queries'
import { isContentValid } from '../../lib/validate'

import Editor from '../view/Editor'

export default () => {
  const { articleId: id } = useParams()
  const navigate = useNavigate()

  const { error, loading, data } = useQuery<Article>(Article, {
    variables: { id },
  })

  const onCompleted = useCallback((data) => {
    const newId = data?.createArticle?.id ?? data?.updateArticle?.id
    if (newId != null) {
      // Anyone hardly wants to return to editing going back in history.
      navigate(`/article/${newId}`, { replace: true })
    } else {
      navigate('/', { replace: true })
    }
  }, [])

  const [doCreate] = useMutation(CreateArticle, {
    refetchQueries: 'all',
    onCompleted,
  })
  const [doUpdate] = useMutation(UpdateArticle, {
    refetchQueries: 'all',
    update: (cache) => cache.evict({ broadcast: true }),
    onCompleted,
  })
  const [doRemove] = useMutation(RemoveArticle, {
    refetchQueries: 'all',
    update: (cache) => cache.evict({ broadcast: true }),
    onCompleted,
  })

  const [shouldShowWarnings, setShouldShowWarnings] = useState(false)
  const handleSubmit = useCallback(
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
