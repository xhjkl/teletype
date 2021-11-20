/** @jsx createElement */
/** @jsxFrag Fragment */
import { Fragment, ReactNode, createElement } from 'react'

type Props = { children: ReactNode }

export default ({ children }: Props) => (
  <>
    <div className='row small' />
    <div className='row'>
      <p>{children}</p>
    </div>
  </>
)
