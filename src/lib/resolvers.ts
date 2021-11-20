import { ArticleContent } from './types'
import prisma from './prisma'
import saturateExcerpts from './saturateExcerpts'

type Id = Pick<ArticleContent, 'id'>
type Rest = Required<Omit<ArticleContent, 'id'>>

export default {
  Query: {
    add: (_: never, { x, y }: { x: number; y: number }) => x + y,

    isLoggedIn: (_: never, { sessionId }: { sessionId: string }) =>
      sessionId != null,
    sessionId: (_: never, { sessionId }: { sessionId: string }) =>
      sessionId ?? null,

    article: (_: never, { id }: Id) =>
      prisma.article.findUnique({
        where: { id },
        rejectOnNotFound: false,
      }),
    allArticles: () =>
      prisma.article
        .findMany({
          orderBy: { publicationDate: 'desc' },
        })
        .then((x) => x.map(saturateExcerpts)),
  },

  Mutation: {
    logIn: () => '0',
    logOut: () => true,

    createArticle: (
      _: never,
      {
        title,
        author,
        imageAddress,
        body,
      }: Pick<Rest, 'title' | 'author' | 'imageAddress' | 'body'>
    ) =>
      prisma.article.create({
        data: {
          title,
          author,
          imageAddress,
          body,
          publicationDate: +Date.now(),
        },
        select: { id: true },
      }),
    updateArticle: (
      _: never,
      {
        id,
        title,
        author,
        imageAddress,
        body,
      }: Pick<Id & Rest, 'id' | 'title' | 'author' | 'imageAddress' | 'body'>
    ) =>
      prisma.article.update({
        where: { id },
        data: {
          title,
          author,
          imageAddress,
          body,
        },
        select: { id: true },
      }),
    removeArticle: (_: never, { id }: Id) =>
      prisma.article.delete({
        where: { id },
      }),
  },
}
