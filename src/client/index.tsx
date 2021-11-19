//
//  Top-level entry point in the app bundle.
//
/** @jsx createElement */
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { createElement } from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import './style.css'
import Root from './Root'

const apolloClient = new ApolloClient({
  uri: '/query',
  cache: new InMemoryCache({}),
})

const start = () => {
  const root = document.querySelector('#root')
  const preservedPropsContainer = document.querySelector(
    'head>script[type=x-data]'
  )
  const preservedProps = preservedPropsContainer?.textContent
  const props = preservedProps != null ? JSON.parse(atob(preservedProps)) : {}
  const preservedCacheContainer = document.querySelector(
    'head>script[type=x-cache]'
  )
  const preservedCache = preservedCacheContainer?.textContent
  const cacheState =
    preservedCache != null ? JSON.parse(atob(preservedCache)) : {}
  apolloClient.restore(cacheState)
  hydrate(
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Root {...props} />
      </BrowserRouter>
    </ApolloProvider>,
    root
  )
}

if (document.readyState !== 'loading') {
  // Ensuring async.
  setTimeout(start, 0)
} else {
  addEventListener('DOMContentLoaded', start)
}
