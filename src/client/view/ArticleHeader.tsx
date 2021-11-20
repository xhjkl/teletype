/** @jsx createElement */
import { ReactNode, createElement } from 'react'

type Props = { children: ReactNode }

export const ArticleHeader = ({ children }: Props) => (
  <div className='row mid'>
    <h1>{children}</h1>
  </div>
)

export default ArticleHeader
