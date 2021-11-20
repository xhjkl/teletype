/** @jsx createElement */
/** @jsxFrag Fragment */
import { Fragment, createElement } from 'react'
import { Route, Routes } from 'react-router-dom'

import Article from './page/Article'
import Editor from './page/Editor'
import Feed from './page/Feed'

export default () => (
  <>
    <Routes>
      <Route path='/'>
        <Route index element={<Feed />} />
        <Route path='article'>
          <Route path='new' element={<Editor />} />
          <Route path=':articleId'>
            <Route index element={<Article />} />
            <Route path='edit' element={<Editor />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  </>
)
