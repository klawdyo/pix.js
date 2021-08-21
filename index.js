const { pix, qrcode } = require('./lib/pix');

const payload = {
  key: 'klawdyo@gmail.com',
  name: 'Jose Claudio Medeiros de Lima',
  city: 'Assu/RN',
  price: 1.30,
  zipcode: 59650000,
  transactionId: 'SINASEFE-18/2021',
};


// Devolve a linha digitável do pix
const code = pix(payload)
console.log(code)

// Devolve a imagem do qrcode em base64
const qr = qrcode(payload)
  .then(url => console.log(url))

