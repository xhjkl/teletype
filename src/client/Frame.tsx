/**  @jsx createElement */
import { createElement } from 'react'

/** Topmost component that holds the whole DOM tree,
 * including `<head>` and styles, and which renders the root component.
 */
const Frame = ({
  title = '',
  apolloState = {},
  mainMarkup = '',
  mainProps = {},
}) => (
  <html>
    <head>
      <link rel='icon' href='/-/icon.svg' />
      <link rel='stylesheet' href='/-/app.css' />
      <meta charSet='utf-8' />
      <meta name='theme-color' content='#000000' />
      <meta
        name='theme-color'
        media='(prefers-color-scheme: light)'
        content='#111111'
      />
      <meta
        name='theme-color'
        media='(prefers-color-scheme: dark)'
        content='#000000'
      />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
      />
      <title>{title}</title>
      <script
        type='x-data'
        dangerouslySetInnerHTML={{
          __html: Buffer.from(JSON.stringify(mainProps)).toString('base64'),
        }}
      />
      <script
        type='x-cache'
        dangerouslySetInnerHTML={{
          __html: Buffer.from(JSON.stringify(apolloState)).toString('base64'),
        }}
      />
      <script async src='/-/app.js' />
    </head>
    <body>
      <div id='root' dangerouslySetInnerHTML={{ __html: mainMarkup }} />
    </body>
  </html>
)

export default Frame
