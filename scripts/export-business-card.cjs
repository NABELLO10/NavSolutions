const path = require('path')
const { pathToFileURL } = require('url')
const { chromium } = require('playwright')

const root = path.resolve(__dirname, '..')
const htmlPath = path.resolve(root, process.argv[2] || 'tarjeta-presentacion.html')
const outputName = process.argv[3] || path.basename(htmlPath, '.html')
const outputDir = path.join(root, 'dist', outputName)
const scale = 300 / 96

async function main() {
  const browser = await chromium.launch()
  const page = await browser.newPage({
    viewport: { width: 1400, height: 900 },
    deviceScaleFactor: scale,
  })

  await page.goto(pathToFileURL(htmlPath).href)
  await page.emulateMedia({ media: 'screen' })
  await page.evaluate(() => document.fonts?.ready)

  await require('fs').promises.mkdir(outputDir, { recursive: true })

  const cards = page.locator('.card-wrap')
  await cards.nth(0).screenshot({
    path: path.join(outputDir, 'tarjeta-presentacion-frente.png'),
    omitBackground: false,
  })
  await cards.nth(1).screenshot({
    path: path.join(outputDir, 'tarjeta-presentacion-reverso.png'),
    omitBackground: false,
  })

  await browser.close()

  console.log(path.join(outputDir, 'tarjeta-presentacion-frente.png'))
  console.log(path.join(outputDir, 'tarjeta-presentacion-reverso.png'))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
