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

### Estático Simples

O uso mais básico necessita apenas da chave, nome e cidade do vendedor e um código de identificação.

```js
// Devolve o pix copia e cola
const code = pix({
  key: '3066362f-020c-4b46-9c1b-4ee3cf8a1bcc',
  name: 'Jose Claudio Medeiros de Lima',
  city: 'Assu/RN',
  txId: 'ASD123',
});

// Retorna
// -> 00020126390014BR.GOV.BCB.PIX0117klawdyo@gmail.com5204000053039865802BR5924Jose Claudio Medeiros de6007Assu/RN62440506ASD12350300017BR.GOV.BCB.BRCODE01051.0.06304D71F
```

### Estático com Valor Fixo

```js
const code = pix({
  key: '3066362f-020c-4b46-9c1b-4ee3cf8a1bcc',
  name: 'Jose Claudio Medeiros de Lima',
  city: 'Assu/RN',
  txId: 'ASD123',
  amount: 50.99,
});

// Retorna
// -> 00020126390014BR.GOV.BCB.PIX0117klawdyo@gmail.com520400005303986540550.995802BR5924Jose Claudio Medeiros de6007Assu/RN62440506ASD12350300017BR.GOV.BCB.BRCODE01051.0.063047887
```

### Código de uso único com valor fixo

```js
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

// Retorna
// -> 00020101021226860014BR.GOV.BCB.PIX01363066362f-020c-4b46-9c1b-4ee3cf8a1bcc0224Parcela 1/24 - Sistema +5204000053039865406349.995802BR5924Jose Claudio Medeiros de6007Assu/RN610859650000624305051234550300017BR.GOV.BCB.BRCODE01051.0.063044A4B
```

### Pegando o QR Code do pagamento

```js
const code = qrcode({
  key: '3066362f-020c-4b46-9c1b-4ee3cf8a1bcc',
  amount: 349.99,
  txId: '12345',
  name: 'Jose Claudio Medeiros de Lima',
  city: 'Assu/RN',
  zipcode: 59650000,
  description: 'Parcela 1/24 - Sistema + Site',
  isUnique: true,
});

// Retorna
// -> data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOQAAADkCAYAAACIV4iNAAAA ... ABJRU5ErkJggg==
```

## Especificidades

- ### **txId**

  - Nubank aceita txId com hífens, letras, números e barras. Mas é obrigatório ter um txId
  - Banco do Brasil só aceita letras e números no txId mas é possível deixá-lo em branco
  - Inter exige o txId e só aceita letras e números

  Para máxima compatibilidade, pix.js torna obrigatório informar um txId somente com letras e números

## Referências

- [Manual do pix do BCB](https://www.bcb.gov.br/content/estabilidadefinanceira/SiteAssets/Manual%20do%20BR%20Code.pdf)
- [Decodificador PIX](https://pix.nascent.com.br/tools/pix-qr-decoder/)
- [Imagem em base64](https://codebeautify.org/base64-to-image-converter)
- [QRCode em JS](https://www.npmjs.com/package/qrcode)
