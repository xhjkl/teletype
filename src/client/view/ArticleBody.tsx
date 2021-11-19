import * as React from 'react'

export default ({ children }) => (
  <>
    <div className='row small' />
    <div className='row'>
      <p>{children}</p>
    </div>
  </>
)
