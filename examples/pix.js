// Exemplos usando o código processado pelo babel
// const { pix } = require('../dist/pix');

// Exemplo usando o código puro
const { pix } = require('../src/pix');

// const payload = {
//   key: 'klawdyo@gmail.com',
//   name: 'Jose Claudio Medeiros de Lima',
//   city: 'Assú/RN',
//   amount: 1,
//   zipcode: 59650000,
//   txId: '1X2Azzzzzzzz3',
//   isUnique: false,
//   description: '2 bananas e um milk-shake',
// };

// // Devolve a linha digitável do pix
// const code = pix(payload);
const code = pix({
  key: '3066362f-020c-4b46-9c1b-4ee3cf8a1bcc',
  amount: 349.99,
  txId: '12345',
  name: 'Jose Claudio Medeiros de Lima',
  city: 'Assu/RN',
  zipcode: 59650000,
  description: 'Parcela 1/24 - Sistema + Site',
  isUnique: true,
});

console.log(code);
