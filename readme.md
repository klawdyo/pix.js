# pix.js

Biblioteca de geração de códigos pix

## Como usar

```js
const { pix, qrcode } = require('./lib/pix');

const payload = {
  key: 'klawdyo@gmail.com',
  name: 'Jose Claudio Medeiros de Lima',
  city: 'Assu/RN',
  price: 1.3,
  zipcode: 59650000,
  transactionId: 'SINASEFE-18/2021',
};

// Devolve a linha digitável do pix
const code = pix(payload);
console.log(code);

// Devolve a imagem do qrcode em base64
const qr = qrcode(payload).then((url) => console.log(url));
```

## Referências

- [Manual do pix do BCB](https://www.bcb.gov.br/content/estabilidadefinanceira/SiteAssets/Manual%20do%20BR%20Code.pdf)
- [Decodificador PIX](https://pix.nascent.com.br/tools/pix-qr-decoder/)
- [Imagem em base64](https://codebeautify.org/base64-to-image-converter)
- [QRCode em JS](https://www.npmjs.com/package/qrcode)
