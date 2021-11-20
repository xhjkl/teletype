import { gql } from '@apollo/client'

import { ArticleContent } from './types'

export const Article = gql`
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
export type Article = {
  article?: ArticleContent
}

export const Excerpts = gql`
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
export type Excerpts = {
  allArticles: Array<ArticleContent>
}

export const WhoAmI = gql`
  query User($sessionId: String) {
    isLoggedIn(sessionId: $sessionId)
    sessionId(sessionId: $sessionId)
  }
`
export type WhoAmI = {
  isLoggedIn: boolean
  sessionId: string
}

export const CreateArticle = gql`
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
export type CreateArticle = {
  createArticle: Pick<ArticleContent, 'id'>
}

export const UpdateArticle = gql`
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
export type UpdateArticle = {
  updateArticle?: Pick<ArticleContent, 'id'>
}

export const RemoveArticle = gql`
  mutation RemoveArticle($id: String!) {
    removeArticle(id: $id) {
      id
    }
  }
`
export type RemoveArticle = {
  removeArticle?: Pick<ArticleContent, 'id'>
}

export const LogIn = gql`
  mutation LogIn {
    logIn
  }
`
export type LogIn = {
  logIn: string
}

export const LogOut = gql`
  mutation LogOut {
    LogOut
  }
`
export type LogOut = {
  logOut: void
}
