const path = require('path')
const QRCode = require('qrcode')

const root = path.resolve(__dirname, '..')
const outputDir = path.join(root, 'public')

const options = {
  type: 'svg',
  errorCorrectionLevel: 'M',
  margin: 1,
  color: {
    dark: '#020503',
    light: '#ffffff',
  },
}

async function main() {
  await QRCode.toFile(path.join(outputDir, 'qr-whatsapp.svg'), 'https://wa.me/56978696327', options)
  await QRCode.toFile(path.join(outputDir, 'qr-web.svg'), 'https://www.navsolutions.cl', options)
  console.log('public/qr-whatsapp.svg')
  console.log('public/qr-web.svg')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
