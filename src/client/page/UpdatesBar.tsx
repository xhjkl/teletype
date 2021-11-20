/** @jsx createElement */
/** @jsxFrag Fragment */
import { createElement } from 'react'

import Button from '../view/Button'

const UpdatesBar = () => (
  <div className='bottommost overlay' style={{ display: 'none' }}>
    <Button>See updates</Button>
  </div>
)

export default UpdatesBar
