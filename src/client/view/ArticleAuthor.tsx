import * as React from 'react'

export default ({ name, date }) => {
  const timeDescription = React.useMemo(() => {
    const d = new Date(parseInt(date))
    return d.toDateString()
  }, [date])

  return (
    <div className='row small'>
      <p className='author' children={`— ${name}, ${timeDescription}`} />
    </div>
  )
}
