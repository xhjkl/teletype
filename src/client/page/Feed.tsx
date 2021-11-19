import * as React from 'react'
import { gql, useQuery } from '@apollo/client'

import type { ArticleContent } from '../../lib/types'

import UpdatesBar from './UpdatesBar'
import ControlCenter from './ControlCenter'

import Feed from '../view/Feed'

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

export default () => {
  const { error, data } = useQuery<{
    allArticles: Array<ArticleContent>
  }>(excerpts, { pollInterval: 512 + 512 * Math.random() })

  if (error) {
    throw error
  }

  return (
    <>
      <ControlCenter />
      <UpdatesBar />
      <Feed articles={data?.allArticles} />
    </>
  )
}
