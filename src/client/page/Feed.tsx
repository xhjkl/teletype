/** @jsx createElement */
/** @jsxFrag Fragment */
import { Fragment, createElement } from 'react'
import { useQuery } from '@apollo/client'

import { Excerpts } from '../../lib/queries'

import UpdatesBar from './UpdatesBar'
import ControlCenter from './ControlCenter'

import Feed from '../view/Feed'

export default () => {
  const { error, data } = useQuery<Excerpts>(Excerpts, {
    pollInterval: 512 + 512 * Math.random(),
  })

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
