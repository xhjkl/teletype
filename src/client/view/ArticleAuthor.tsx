/** @jsx createElement */
import { createElement, useMemo } from 'react'

type Props = { name?: string; date?: string }

export default ({ name, date }: Props) => {
  const timePart = useMemo(() => {
    if (date == null) {
      return ''
    }

    const d = new Date(parseInt(date))
    return d.toDateString()
  }, [date])
  const namePart = name ?? ''
  const shouldUseComma = name != null && date != null

  return (
    <div className='row small'>
      <p
        className='author'
        children={`— ${namePart}${shouldUseComma ? ', ' : ''}${timePart}`}
      />
    </div>
  )
}
