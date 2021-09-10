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
// importa
import { pix } from ('@klawdyo/pix.js');

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
// importa
import { pix } from ('@klawdyo/pix.js');

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

### Código com valor fixo e uma descrição

```js

// importa
import { pix } from ('@klawdyo/pix.js');


const code = pix({
  key: '3066362f-020c-4b46-9c1b-4ee3cf8a1bcc',
  amount: 349.99,
  txId: '12345',
  name: 'Jose Claudio Medeiros de Lima',
  city: 'Assu/RN',
  zipcode: 59650000,
  description: 'Parcela 1/24 - Sistema + Site',
});

// Retorna
// -> 00020101021226860014BR.GOV.BCB.PIX01363066362f-020c-4b46-9c1b-4ee3cf8a1bcc0224Parcela 1/24 - Sistema +5204000053039865406349.995802BR5924Jose Claudio Medeiros de6007Assu/RN610859650000624305051234550300017BR.GOV.BCB.BRCODE01051.0.063044A4B
```

### Pegando o QR Code do pagamento

```js
// importa
import { qrcode } from ('@klawdyo/pix.js');

const code = qrcode({
  key: '3066362f-020c-4b46-9c1b-4ee3cf8a1bcc',
  amount: 349.99,
  txId: '12345',
  name: 'Jose Claudio Medeiros de Lima',
  city: 'Assu/RN',
  zipcode: 59650000,
  description: 'Parcela 1/24 - Sistema + Site',
});

// Retorna
// -> data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOQAAADkCAYAAACIV4iNAAAA ... ABJRU5ErkJggg==
```

## Funções Auxiliares

Para a máxima compatibilidade, pix.js devolve algumas funções úteis para realizar a sanitização e a validação das chaves.

### getKeyType

`getKeyType(pixKey)` recebe uma chave pix como parâmetro e retorna o tipo dela.

Os valores retornados são: `cpf`, `cnpj`, `email`, `phone` e `random`.

```js
// importa
import { getKeyType } from ('@klawdyo/pix.js');

getKeyType('170.803.140-54'); // -> 'cpf'
getKeyType('170803140-54'); // -> 'cpf'
getKeyType('17080314054'); // -> 'cpf'
getKeyType('38.262.543/0001-50'); // -> 'cnpj'
getKeyType('382625430001-50'); // -> 'cnpj'
getKeyType('38262543000150'); // -> 'cnpj'
getKeyType('klawdyo@gmail.com'); // -> 'email'
getKeyType('+5584996964567'); // -> 'phone'
getKeyType('+55 (84) 9 9696-4567'); // -> 'phone'
getKeyType('+5584996964567'); // -> 'phone'
getKeyType('3066362f-020c-4b46-9c1b-4ee3cf8a1bcc'); // ->'random'

```

### sanitizeKey

`sanitizeKey(pixKey)` recebe uma chave pix e realiza a limpeza dos caracteres especiais de acordo com o tipo dela.

Esta função já é chamada quando as informações para geração do pix são processadas e não é necessário chamar novamente, caso o objetivo seja apenas limpar a chave.

```js
import { sanitizeKey } from '@klawdyo/pix.js';

sanitizeKey('170.803.140-54');
// -> '17080314054'
sanitizeKey('170803140-54');
// -> '17080314054'
sanitizeKey('17080314054');
// -> '17080314054'
sanitizeKey('38.262.543/0001-50');
// -> '38262543000150'
sanitizeKey('382625430001-50');
// -> '38262543000150'
sanitizeKey('38262543000150');
// -> '38262543000150'
sanitizeKey('klawdyo@gmail.com');
// -> 'klawdyo@gmail.com'
sanitizeKey('+5584996964567');
// -> '+5584996964567'
sanitizeKey('+55 (84) 9 9696-4567');
// -> '+5584996964567'
sanitizeKey('3066362f-020c-4b46-9c1b-4ee3cf8a1bcc');
// -> '3066362f-020c-4b46-9c1b-4ee3cf8a1bcc'
```

## Changelog

- **10/09/2021**:
  - 0.9.0 - Adicionada sanitizeKey() que limpa os caracteres não permitidos de acordo com o tipo da chave
  - 0.8.0 - Adicionada getKeyType() que identifica o tipo da chave pix

## To Do

- Função parse() irá receber o código copia e cola e irá retornar as partes e os seus valores

## Especificidades

- ### **txId**

  - Nubank aceita txId com hífens, letras, números e barras. Mas é obrigatório ter um txId
  - Banco do Brasil só aceita letras e números no txId mas é possível deixá-lo em branco
  - Inter exige o txId e só aceita letras e números

  Para máxima compatibilidade, pix.js torna obrigatório informar um txId somente com letras e números

- ### **Chaves**

  PIX aceita chaves no formato CPF, CNPJ, Telefone, E-mail e chave aleatória. As 3 primeiras precisam respeitar o formato correto.

  - Chaves do tipo CPF só aceitam números. Sem pontos e traços.
  - Chaves do tipo CNPJ só aceitam números. Sem pontos, barras e traços.
  - Chaves do telefone precisam começar com o "+55" e não pode conter traçoes, parênteses, espaços em branco, etc. Apenas números, exceto o "+" do início.

## Referências

- [Manual do pix do BCB](https://www.bcb.gov.br/content/estabilidadefinanceira/SiteAssets/Manual%20do%20BR%20Code.pdf)
- [Decodificador PIX](https://pix.nascent.com.br/tools/pix-qr-decoder/)
- [Imagem em base64](https://codebeautify.org/base64-to-image-converter)
- [QRCode em JS](https://www.npmjs.com/package/qrcode)
