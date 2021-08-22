const { pix, qrcode } = require('../index');

const payload = {
  key: 'klawdyo@gmail.com',
  name: 'Jose Claudio Medeiros de Lima',
  city: 'AssuRN',
  amount: 1,
  zipcode: 59650000,
  txId: 'SINASEFE-18/2021',
};



// Devolve a imagem do qrcode em base64
qrcode(payload).then(console.log)

