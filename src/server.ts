import rebuildComponentTree from './rebuildComponentTree'
import serveForever from './serveForever'

const main = async () => {
  await rebuildComponentTree()
  await serveForever()
}

main().catch(console.error)
