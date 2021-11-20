import { join } from 'path'
import createServer from 'fastify'
import staticServer from 'fastify-static'

import Frame from './client/Frame'
import Root from './client/Root'

import serveComponent from './serveComponent'
import { addQueryResolver, makeApolloClient } from './queryResolutionHandler'
import {
  preparePropsForMainPage,
  preparePropsForArticleWithName,
} from './preparePropsFromRequest'

const port = Number(process.env.PORT) || 3000

const app = createServer()

export default async () => {
  app.register(staticServer, {
    root: join(__dirname, '..', 'static'),
    prefix: '/-/',
  })

  await addQueryResolver(app)

  app.get('*', async (req, res) => {
    const { title, ...rest } = await preparePropsForMainPage()
    await serveComponent(
      res.raw,
      req.url,
      makeApolloClient(),
      Frame,
      { title },
      Root,
      {
        ...rest,
      }
    )
  })

  app.listen(port, '0.0.0.0', (error, address) => {
    if (error != null) {
      throw error
    }
    console.log(address)
  })
}
