/**
 * sanitizeKey('170.803.140-54'); // -> '17080314054'
 * sanitizeKey('170803140-54'); // -> '17080314054'
 * sanitizeKey('17080314054'); // -> '17080314054'
 * sanitizeKey('38.262.543/0001-50'); // -> '38262543000150'
 * sanitizeKey('382625430001-50'); // -> '38262543000150'
 * sanitizeKey('38262543000150'); // -> '38262543000150'
 * sanitizeKey('klawdyo@gmail.com'); // -> 'klawdyo@gmail.com'
 * sanitizeKey('+5584996964567'); // -> '+5584996964567'
 * sanitizeKey('+55 (84) 9 9696-4567'); // -> '+5584996964567'
 * sanitizeKey('3066362f-020c-4b46-9c1b-4ee3cf8a1bcc'); // -> '3066362f-020c-4b46-9c1b-4ee3cf8a1bcc'
 */

const test = require('tape');
const { sanitizeKey } = require('../dist/pix');

test('Faz a sanitização das chaves pix', (t) => {
  // console.log(CRC(12345678))
  const keys = {

    '170.803.140-54': '17080314054',
    '170803140-54': '17080314054',
    17080314054: '17080314054',
    '38.262.543/0001-50': '38262543000150',
    '382625430001-50': '38262543000150',
    38262543000150: '38262543000150',
    'klawdyo@gmail.com': 'klawdyo@gmail.com',
    '+5584996964567': '+5584996964567',
    '+55 (84) 9 9696-4567': '+5584996964567',
    '3066362f-020c-4b46-9c1b-4ee3cf8a1bcc': '3066362f-020c-4b46-9c1b-4ee3cf8a1bcc',

  };

  Object.keys(keys).forEach((key) => {
    t.equal(sanitizeKey(key), keys[key], `A chave ${key} sanitizada deve ser igual a "${keys[key]}"`);
  });

  t.end();
});
