import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { gql, useMutation, useLazyQuery, useQuery } from '@apollo/client'

import Button from '../view/Button'

const whoAmI = gql`
  query User($sessionId: String) {
    isLoggedIn(sessionId: $sessionId)
    sessionId(sessionId: $sessionId)
  }
`

const logIn = gql`
  mutation LogIn {
    logIn
  }
`

const logOut = gql`
  mutation LogOut {
    logOut
  }
`

const ControlCenter = () => {
  const [getWhoAmI, { data }] = useLazyQuery(whoAmI)

  const [doLogIn, {}] = useMutation(logIn, {
    onCompleted(data) {
      getWhoAmI({ variables: { sessionId: data.logIn } })
    },
  })

  const [doLogOut, {}] = useMutation(logOut, {
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

  return (
    <div className='sticky overlay'>
      {data?.isLoggedIn ? (
        <>
          {articleId != null ? (
            <Button onClick={didClickEdit}>Edit</Button>
          ) : (
            <Button onClick={didClickCompose}>Compose</Button>
          )}
          <Button onClick={doLogOut}>Log Out</Button>
        </>
      ) : (
        <>
          <Button onClick={doLogIn}>Log In</Button>
        </>
      )}
    </div>
  )
}

export default ControlCenter
