import { join } from 'path'
import { build } from 'esbuild'

import shouldUseDevTools from './shouldUseDevTools'

/** Populate build directory with the bundle. */
export default async () => {
  build({
    entryPoints: [join(__dirname, 'client', 'index.tsx')],
    outfile: join(__dirname, '..', 'static', 'app.js'),
    bundle: true,
    minify: !shouldUseDevTools,
    watch: shouldUseDevTools
      ? {
          onRebuild(error, result) {
            if (error != null) {
              console.error('while building:', error)
              return
            }
            console.log('rebuilt:', result)
          },
        }
      : false,
  })
}
