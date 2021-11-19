import { gql } from 'apollo-server-core'

export default gql`
  type Article {
    id: String
    title: String
    author: String
    imageAddress: String
    publicationDate: String
    excerpt: String
    body: String
  }

  type Query {
    add(x: Int!, y: Int!): Int
    isLoggedIn(sessionId: String): Boolean
    sessionId(sessionId: String): String
    article(id: String): Article
    allArticles: [Article]
  }

  type Mutation {
    logIn: String
    logOut: Boolean

    createArticle(
      title: String
      author: String
      imageAddress: String
      body: String
    ): Article
    updateArticle(
      id: String!
      title: String
      author: String
      imageAddress: String
      body: String
    ): Article
    removeArticle(id: String!): Article
  }

  type Subscription {
    newPosts: Int
  }
`
