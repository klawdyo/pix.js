// Exemplos usando o código processado pelo babel
// const { pix } = require('../dist/pix');

// Exemplo usando o código puro
const { pix } = require('../src/pix');

const payload = {
  key: 'klawdyo@gmail.com',
  name: 'Jose Claudio Medeiros de Lima',
  city: 'Assú/RN',
  amount: 12.69,
  zipcode: 59650000,
  txId: '1X2Azzzzzzzz3',
  isUnique: false,
  description: 'Manutenção Mensal',
};

const keys = {
  cpf: '170.803.140-54',
  cnpj: '38.262.543/0001-50',
  random: '3066362f-020c-4b46-9c1b-4ee3cf8a1bcc',
  email: 'klawdyo@gmail.com',
  phone: '+55 (84) 9 9696-4567',
};

const key = keys.phone;

console.log({ ...payload, key });

// // Devolve a linha digitável do pix
const code = pix({ ...payload, key });

console.log(code);
