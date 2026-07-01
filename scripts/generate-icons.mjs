import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import toIco from 'to-ico'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const appDir = join(root, 'src', 'app')
const publicDir = join(root, 'public')

async function renderSvg(svgPath, outPath, size) {
  const svg = readFileSync(svgPath)
  await sharp(svg, { density: 300 })
    .resize(size, size, { fit: 'contain', background: '#161616' })
    .png({ compressionLevel: 9 })
    .toFile(outPath)
}

async function main() {
  const nsecSvg = join(appDir, 'icon.svg')
  const nsSvg = join(root, 'scripts', 'icon-ns.svg')

  await renderSvg(nsecSvg, join(appDir, 'icon.png'), 512)
  await renderSvg(nsecSvg, join(appDir, 'apple-icon.png'), 180)

  const favicon16 = await sharp(readFileSync(nsSvg), { density: 300 })
    .resize(16, 16, { fit: 'contain', background: '#161616' })
    .png()
    .toBuffer()

  const favicon32 = await sharp(readFileSync(nsSvg), { density: 300 })
    .resize(32, 32, { fit: 'contain', background: '#161616' })
    .png()
    .toBuffer()

  writeFileSync(join(appDir, 'favicon.ico'), await toIco([favicon16, favicon32]))

  await renderSvg(nsSvg, join(publicDir, 'favicon-16.png'), 16)
  await renderSvg(nsSvg, join(publicDir, 'favicon-32.png'), 32)

  console.log('Generated icon.png, apple-icon.png, favicon.ico, favicon-16.png, favicon-32.png')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
