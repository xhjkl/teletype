import prisma from './prisma'
import saturateExcerpts from './saturateExcerpts'

export default {
  Query: {
    add: (_, { x, y }) => x + y,

    isLoggedIn: (_, { sessionId }) => sessionId != null,
    sessionId: (_, { sessionId }) => sessionId ?? null,

    article: (_, { id }) =>
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

    createArticle: (_, { title, author, imageAddress, body }) =>
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
    updateArticle: (_, { id, title, author, imageAddress, body }) =>
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
    removeArticle: (_, { id }) =>
      prisma.article.delete({
        where: { id },
      }),
  },
}
