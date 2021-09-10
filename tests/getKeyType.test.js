// getKeyType('170.803.140-54'); // -> 'cpf'
// getKeyType('170803140-54'); // -> 'cpf'
// getKeyType('17080314054'); // -> 'cpf'
// getKeyType('38.262.543/0001-50'); // -> 'cnpj'
// getKeyType('382625430001-50'); // -> 'cnpj'
// getKeyType('38262543000150'); // -> 'cnpj'
// getKeyType('klawdyo@gmail.com'); // -> 'email'
// getKeyType('+5584996964567'); // -> 'phone'
// getKeyType('+55 (84) 9 9696-4567'); // -> 'phone'
// getKeyType('+5584996964567'); // -> 'phone'
// getKeyType('3066362f-020c-4b46-9c1b-4ee3cf8a1bcc'); // -> 'random'

const test = require('tape');
const { getKeyType } = require('../dist/pix');

test('Testa o tipo das chaves pix', (t) => {
  // console.log(CRC(12345678))
  const keys = {

    '170.803.140-54': 'cpf',
    '170803140-54': 'cpf',
    17080314054: 'cpf',
    '38.262.543/0001-50': 'cnpj',
    '382625430001-50': 'cnpj',
    38262543000150: 'cnpj',
    'klawdyo@gmail.com': 'email',
    '+5584996964567': 'phone',
    '+55 (84) 9 9696-4567': 'phone',
    '3066362f-020c-4b46-9c1b-4ee3cf8a1bcc': 'random',

  };

  Object.keys(keys).forEach((key) => {
    t.equal(getKeyType(key), keys[key], `A chave ${key} deve ser do tipo "${keys[key]}"`);
  });

  t.end();
});
