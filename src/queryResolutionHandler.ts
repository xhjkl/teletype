import type { FastifyInstance } from 'fastify'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { ApolloServer } from 'apollo-server-fastify'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'

import typeDefs from './lib/typeDefs'
import resolvers from './lib/resolvers'

export const makeApolloClient = () =>
  new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: new SchemaLink({
      schema: makeExecutableSchema({ typeDefs, resolvers }),
    }),
  })

export const addQueryResolver = async (app: FastifyInstance) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await app.close()
            },
          }
        },
      },
      ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
    ],
  })

  await server.start()

  app.register(server.createHandler({ path: '/query' }))
}
