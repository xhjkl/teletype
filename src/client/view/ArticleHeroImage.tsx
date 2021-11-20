/** @jsx createElement */
import { createElement } from 'react'

type Props = { src?: string }

export default ({ src }: Props) => (
  <div className='hero row'>
    <img className='hero' src={src} />
  </div>
)
