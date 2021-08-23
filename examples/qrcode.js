// Exemplos usando o código processado pelo babel
const { qrcode } = require('../dist/pix');

qrcode({
  key: '3066362f-020c-4b46-9c1b-4ee3cf8a1bcc',
  amount: 349.99,
  txId: '12345',
  name: 'Jose Claudio Medeiros de Lima',
  city: 'Assu/RN',
  zipcode: 59650000,
  description: 'Parcela 1/24 - Sistema + Site',
  isUnique: true,
}).then(console.log);
