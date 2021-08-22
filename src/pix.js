const QRCode = require('qrcode');

const { CRC } = require('../dist/crc');
const { pad, removeAccent } = require('../dist/utils');

/**
 * Recebe os dados do pix e devolve um objeto de configurações que será usado pela
 * biblioteca para geração do código seguindo os padrões definidos pelo BCB.
 *
 * @param {Object} params Parâmetros de configuração da venda
 *              {String} key        : Chave pix do recebedor
 *              {String} txId       : ID da Transação
 *              {Number} amount     : Valor da compra
 *              {String} name       : Nome do comprador
 *              {String} city       : Cidade da compra
 *              {Integer}zipcode    : CEP da cidade
 *              {String} description: Descrição da transação
 *              {Boolean} isUnique  : Define se é uma transação única
 * @returns {Object} Objeto com as configurações
 */
const setConfigs = (params = {}) => {
  //
  const {
    txId = null,
    key = null,
    name = null,
    amount = null,
    city = null,
    zipcode = null,
    description = null,
    isUnique = false,
  } = params;

  return [
    {
      id: 0,
      required: true,
      name: 'Payload format indicator',
      value: '01',
    },

    {
      id: 1,
      required: false,
      name: 'Point of Initiation Method',
      value: isUnique,
      sanitize: (value) => (value ? '12' : '11'),
    },

    {
      id: 26,
      required: true,
      name: 'Merchant Account Information',
      children: [
        {
          id: 0,
          required: true,
          name: 'GUI',
          value: 'BR.GOV.BCB.PIX',
        },
        {
          id: 1,
          required: true,
          name: 'PIX Key',
          value: key,
        },
        {
          id: 2,
          required: false,
          name: 'Transaction Description',
          value: description,
          sanitize: (value) => String(value).substr(0, 25).trim(),
        },
      ],
    },

    {
      id: 52,
      required: true,
      name: 'Merchant Category Code',
      value: '0000',
    },

    {
      id: 53,
      required: true,
      name: 'Transaction Currency',
      value: '986', // “986” – BRL: real brasileiro - ISO4217
    },

    {
      id: 54,
      required: false,
      name: 'Transaction Amount',
      value: amount, // Valor em inteiro
      sanitize: (value) => Number.parseFloat(value).toFixed(2),
    },

    {
      id: 58,
      required: true,
      name: 'Country Code',
      value: 'BR',
    },

    {
      id: 59,
      required: true,
      name: 'Merchant Name',
      value: name,
      sanitize: (value) => String(value).substr(0, 25).trim(),
    },

    {
      id: 60,
      required: true,
      name: 'Merchant City',
      value: city,
      sanitize: (value) => String(value).substr(0, 15).trim(),
    },

    {
      id: 61,
      required: false,
      name: 'Postal Code',
      value: zipcode,
      sanitize: (value) => String(value)
        .replace(/[^0-9]+/g, '')
        .substr(0, 15)
        .trim(),
    },

    {
      id: 62,
      required: true,
      name: 'Aditional Data Field Template',
      children: [
        {
          id: 5,
          required: true,
          name: 'Reference Label',
          value: txId,
          validation: (value) => {
            if (String(value).length > 25) throw new Error('txId não pode ter mais de 25 caracteres');

            if (/[^0-9a-z]+/i.test(value)) throw new Error('txId só permite letras e números');

            return true;
          },
        },

        {
          id: 50,
          required: true,
          name: 'Payment System specific template',
          children: [
            {
              id: 0,
              name: 'Globally Unique Identifier',
              value: 'BR.GOV.BCB.BRCODE',
            },

            {
              id: 1,
              name: 'Payment System specific',
              value: '1.0.0',
            },

          ],
        },
      ],
    },
  ];
};

/**
 * Retorna o número de caracteres de um valor como string
 * com um número definido de caracteres.
 *
 * @example
 * getLength('Claudio', 3)
 * // -> '007'
 *
 * @param {String}  text  Valor
 * @param {Integer} length Número de caracteres
 */
function getLength(text, length = 2) {
  return pad(text.length, length);
}

/**
 * Cria um trecho do código a partir das configurações definidas
 *
 * @param {Object} options  Opções de configuração
 *          {Integer} id      : Id do trecho do pix
 *          {String}  name    : Nome do trecho. Somente para referência
 *          {String}  value   : Valor que o trecho terá
 *          {String}  children: Array de objetos contendo as mesmas opções deste objeto options
 *          {String}  sanitize: Função que retornará o valor deste trecho.
 *                              Ex.: Converte para float de 2 dígitos, limita um tamanho etc.
 *          {Boolean} required: True/False para determinar se este trecho deve ser obrigatório
 *
 * @returns {String} Trecho padronizado para ser adicionado ao pix
 */
const getString = (options = {}) => {
  //
  let {
    id,
    value,
  } = options;

  const {
    name,
    children,
    sanitize,
    validation,
    required = false,
  } = options;

  // É obrigatório mas não tem value nem children definido
  if (required && !value && !children) {
    throw new Error(`"${name}" is required`);
  }

  // Não é obrigatório, não tem value nem children definido
  if (!required && !value && !children) return '';

  // Valida, caso exista uma validação
  if (validation) validation(value);

  // Retira os caracteres especiais
  if (value) value = removeAccent(value);

  // Sanitiza o valor, caso exista uma função para isso
  if (sanitize) value = sanitize(value);

  // Transforma o id em uma string com 2 caracteres
  id = pad(id, 2);

  // Se tiver um children, processe seu conteúdo antes de gerar o valor atual
  if (children) value = children.reduce((accu, curr) => accu + getString(curr), '');

  // Devolva id com 2 caractes, o tamanho com 2 caracteres e o valor
  return `${id}${getLength(value)}${value}`;
};

/**
 * CRC16 é o último trecho do código. É usado para validar o código anterior.
 *
 * @param {String} code  Código do pix copia e cola
 * @returns {String} Trecho de validação do pix
 */
const getCRC = (code) => getString({
  id: 63,
  // O código CRC gerado terá 4 caracteres e o ID é 63.
  // Para a geração correta do código, é nenecessário utilizar o "6304" que
  // seria adicionado naturalmente por getString()
  value: CRC(`${code}6304`),
});

/**
 * Gera o código do pix copia e cola
 *
 * @param {Object} params Parâmetros de configuração da venda
 *              {String} key        : Chave pix do recebedor
 *              {String} txId       : ID da Transação
 *              {Number} amount     : Valor da compra
 *              {String} name       : Nome do comprador
 *              {String} city       : Cidade da compra
 *              {Integer}zipcode    : CEP da cidade
 *              {String} description: Descrição da transação
 *              {Boolean} isUnique  : Define se é uma transação única
 * @returns {String} String do pix copia e cola para as configurações definidas.
 */
const pix = ({
  name, amount, zipcode, city, txId, key, description, isUnique,
}) => {
  const code = setConfigs({
    key, name, amount, zipcode, city, txId, description, isUnique,
  })
    .reduce((accu, curr) => accu + getString(curr), '');

  return code + getCRC(code);
};

/**
 * Retorna o base64 da imagem
 *
 * @param {Object} payload
 * @return {String} Código base64 da imagem
 */
const qrcode = async (payload) => {
  const code = pix(payload);
  return QRCode.toDataURL(code);
};

module.exports = {
  pix,
  qrcode,
};
