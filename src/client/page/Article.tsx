/** @jsx createElement */
/** @jsxFrag Fragment */
import { Fragment, createElement, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import ControlCenter from './ControlCenter'

import { Article as Query } from '../../lib/queries'

import Article from '../view/Article'

export default () => {
  const { articleId: id } = useParams()

  const { error, loading, data } = useQuery<Query>(Query, {
    variables: { id },
    pollInterval: 200 + 200 * Math.random(),
  })

  const navigate = useNavigate()

  useEffect(() => {
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
