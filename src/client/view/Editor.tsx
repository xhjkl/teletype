import * as React from 'react'

import Button from './Button'

type Props = {
  defaultTitle?: string
  defaultAuthor?: string
  defaultHeroImageAddress?: string
  defaultBody?: string
  shouldShowWarnings?: boolean
  couldCreate?: boolean
  couldUpdate?: boolean
  couldRemove?: boolean
  onSubmit?: (
    actionKind: 'create' | 'update' | 'remove',
    title: string,
    author: string,
    image: string,
    body: string
  ) => void
}

const Editor: React.FC<Props> = ({
  defaultTitle,
  defaultAuthor,
  defaultHeroImageAddress,
  defaultBody,
  shouldShowWarnings = false,
  couldCreate = false,
  couldUpdate = false,
  couldRemove = false,
  onSubmit,
}) => {
  const titleRef = React.useRef<HTMLInputElement>()
  const heroImageLocationRef = React.useRef<HTMLInputElement>()
  const authorRef = React.useRef<HTMLInputElement>()
  const bodyRef = React.useRef<HTMLTextAreaElement>()

  const handleSubmit = React.useCallback(
    (action) => {
      onSubmit != null &&
        onSubmit(
          action,
          titleRef.current!.value,
          authorRef.current!.value,
          heroImageLocationRef.current!.value,
          bodyRef.current!.value
        )
    },
    [onSubmit, titleRef, authorRef, heroImageLocationRef, bodyRef]
  )

  const handleCreate = React.useCallback(() => {
    handleSubmit('create')
  }, [onSubmit])
  const handleUpdate = React.useCallback(() => {
    handleSubmit('update')
  }, [onSubmit])
  const handleRemove = React.useCallback(() => {
    handleSubmit('remove')
  }, [onSubmit])

  return (
    <>
      <div className='row mid' />
      <div className='row small'>
        <input
          defaultValue={defaultTitle || void ''}
          placeholder={'Title...'}
          tabIndex={1}
          ref={titleRef}
        />
      </div>
      <div className='row small' style={{ opacity: +shouldShowWarnings }}>
        Should be sweet, and between one and two hundred characters.
      </div>
      <div className='row small'>
        <input
          defaultValue={defaultHeroImageAddress || void ''}
          placeholder={'Hero image location...'}
          tabIndex={-1}
          ref={heroImageLocationRef}
        />
      </div>
      <div className='row small' style={{ opacity: +shouldShowWarnings }}>
        Should be pretty.
      </div>
      <div className='row small'>
        <input
          defaultValue={defaultAuthor || void ''}
          placeholder={'Your name...'}
          tabIndex={2}
          ref={authorRef}
        />
      </div>
      <div className='row small' style={{ opacity: +shouldShowWarnings }}>
        Should be sincere.
      </div>
      <div className='row'>
        <textarea
          defaultValue={defaultBody || void ''}
          placeholder={'Your story...'}
          tabIndex={3}
          ref={bodyRef}
        />
      </div>
      <div className='row small' style={{ opacity: +shouldShowWarnings }}>
        Should be interesting, and non-empty.
      </div>
      {couldCreate && (
        <div className='row spaced'>
          <Button tabIndex={4} onClick={handleCreate}>
            Publish
          </Button>
        </div>
      )}
      {couldUpdate && (
        <div className='row spaced'>
          <Button tabIndex={4} onClick={handleUpdate}>
            Save Edits
          </Button>
        </div>
      )}
      {couldRemove && (
        <div className='row spaced'>
          <Button tabIndex={4} onClick={handleRemove}>
            Retract Article
          </Button>
        </div>
      )}
      <div className='row mid' />
      <div className='row mid' />
    </>
  )
}

export default Editor
