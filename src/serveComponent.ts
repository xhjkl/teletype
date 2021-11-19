import type { ServerResponse } from 'http'
import { ApolloProvider, ApolloClient } from '@apollo/client'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { FunctionComponent, ComponentClass, createElement } from 'react'
import { renderToString, renderToStaticNodeStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'

type InputComponentFactory<P> =
  | FunctionComponent<P>
  | ComponentClass<P>
  | string

/** Respond to a request with a pre-rendered root component. */
export default async <
  CacheShape,
  FrameProps extends Record<string, unknown>,
  MainProps extends Record<string, unknown>
>(
  res: ServerResponse,
  location: string,
  client: ApolloClient<CacheShape>,
  frameFactory: InputComponentFactory<FrameProps>,
  frameProps: FrameProps,
  mainFactory: InputComponentFactory<MainProps>,
  mainProps: MainProps
) => {
  const doctypeLine = '<!doctype html>\n'
  const mainCompo = createElement(
    ApolloProvider,
    { client, children: null },
    createElement(
      StaticRouter,
      { location },
      createElement(mainFactory, mainProps)
    )
  )
  const mainMarkup = await getDataFromTree(mainCompo)

  const apolloState = client.extract()

  const frameCompo = createElement(frameFactory, {
    ...frameProps,
    ...{ apolloState, mainMarkup, mainProps },
  })

  const markup = renderToStaticNodeStream(frameCompo)

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.write(doctypeLine)
  markup.pipe(res, { end: true })
}
