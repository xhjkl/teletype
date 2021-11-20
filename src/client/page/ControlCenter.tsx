/** @jsx createElement */
/** @jsxFrag Fragment */
import { Fragment, createElement, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useLazyQuery } from '@apollo/client'

import { LogIn, LogOut, WhoAmI } from '../../lib/queries'

import Button from '../view/Button'

const ControlCenter = () => {
  const [getWhoAmI, { data }] = useLazyQuery<WhoAmI>(WhoAmI)

  const [doLogIn, {}] = useMutation(LogIn, {
    onCompleted(data) {
      getWhoAmI({ variables: { sessionId: data.logIn } })
    },
  })

  const [doLogOut, {}] = useMutation(LogOut, {
    onCompleted() {
      getWhoAmI({ variables: {} })
    },
  })

  const { articleId } = useParams()

  const navigate = useNavigate()

  const didClickEdit = useCallback(() => {
    navigate('./edit')
  }, [navigate])

  const didClickCompose = useCallback(() => {
    navigate('/article/new')
  }, [navigate])

  const didClickLogIn = useCallback(() => {
    doLogIn()
  }, [doLogIn])

  const didClickLogOut = useCallback(() => {
    doLogOut()
  }, [doLogOut])

  return (
    <div className='sticky overlay'>
      {data?.isLoggedIn ? (
        <>
          {articleId != null ? (
            <Button onClick={didClickEdit}>Edit</Button>
          ) : (
            <Button onClick={didClickCompose}>Compose</Button>
          )}
          <Button onClick={didClickLogOut}>Log Out</Button>
        </>
      ) : (
        <>
          <Button onClick={didClickLogIn}>Log In</Button>
        </>
      )}
    </div>
  )
}

export default ControlCenter
