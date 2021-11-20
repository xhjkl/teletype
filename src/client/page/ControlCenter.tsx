import * as React from 'react'
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

  const didClickEdit = React.useCallback(() => {
    navigate('./edit')
  }, [navigate])

  const didClickCompose = React.useCallback(() => {
    navigate('/article/new')
  }, [navigate])

  const didClickLogIn = React.useCallback(() => {
    doLogIn()
  }, [doLogIn])

  const didClickLogOut = React.useCallback(() => {
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
