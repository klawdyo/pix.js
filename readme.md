# pix.js

Biblioteca de geração de códigos pix

## Instalação

```sh
# Usando yarn
yarn add @klawdyo/pix.js

## OU
# Usando npm
npm install @klawdyo/pix.js

```

## Importação

```js

// Modules
const { pix, qrcode } = require('@klawdyo/pix.js');

// ES6
import { pix, qrcode } from ('@klawdyo/pix.js');


```

## Como Usar

```js
const payload = {
  key: 'klawdyo@gmail.com',
  amount: 1.3,
  name: 'Jose Claudio Medeiros de Lima',
  city: 'Assu/RN',
  zipcode: 59650000,
  txId: 'SINASEFE-18/2021',
};

// Devolve o pix copia e cola
const code = pix(payload);

// Devolve a imagem do qrcode em base64
const qr = qrcode(payload).then((url) => console.log(url));
```

## Referências

- [Manual do pix do BCB](https://www.bcb.gov.br/content/estabilidadefinanceira/SiteAssets/Manual%20do%20BR%20Code.pdf)
- [Decodificador PIX](https://pix.nascent.com.br/tools/pix-qr-decoder/)
- [Imagem em base64](https://codebeautify.org/base64-to-image-converter)
- [QRCode em JS](https://www.npmjs.com/package/qrcode)
