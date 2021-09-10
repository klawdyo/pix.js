"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/* eslint-disable no-use-before-define */
var QRCode = require('qrcode');

var _require = require('../dist/crc'),
    CRC = _require.CRC;

var _require2 = require('../dist/utils'),
    pad = _require2.pad,
    removeAccent = _require2.removeAccent;
/**
 * Recebe os dados do pix e devolve um objeto de configurações que será usado pela
 * biblioteca para geração do código seguindo os padrões definidos pelo BCB.
 *
 * @param {Object} params Parâmetros de configuração da venda
 *              {String}  key         : Chave pix do recebedor
 *              {String}  txId        : ID da Transação
 *              {Number}  amount      : Valor da compra
 *              {String}  name        : Nome do comprador
 *              {String}  city        : Cidade da compra
 *              {Integer} zipcode     : CEP da cidade
 *              {String}  description : Descrição da transação
 *              {Boolean} isUnique    : Define se é uma transação única
 * @returns {Object} Objeto com as configurações
 */


var setConfigs = function setConfigs() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  //
  var _params$txId = params.txId,
      txId = _params$txId === void 0 ? null : _params$txId,
      _params$key = params.key,
      key = _params$key === void 0 ? null : _params$key,
      _params$name = params.name,
      name = _params$name === void 0 ? null : _params$name,
      _params$amount = params.amount,
      amount = _params$amount === void 0 ? null : _params$amount,
      _params$city = params.city,
      city = _params$city === void 0 ? null : _params$city,
      _params$zipcode = params.zipcode,
      zipcode = _params$zipcode === void 0 ? null : _params$zipcode,
      _params$description = params.description,
      description = _params$description === void 0 ? null : _params$description,
      _params$isUnique = params.isUnique,
      isUnique = _params$isUnique === void 0 ? false : _params$isUnique;
  return [{
    id: 0,
    required: true,
    name: 'Payload format indicator',
    value: '01'
  }, {
    id: 1,
    required: false,
    name: 'Point of Initiation Method',
    value: isUnique,
    sanitize: function sanitize(value) {
      return value ? '12' : '';
    }
  }, {
    id: 26,
    required: true,
    name: 'Merchant Account Information',
    children: [{
      id: 0,
      required: true,
      name: 'GUI',
      value: 'BR.GOV.BCB.PIX'
    }, {
      id: 1,
      required: true,
      name: 'PIX Key',
      value: key,
      sanitize: function sanitize(value) {
        return sanitizeKey(value);
      }
    }, {
      id: 2,
      required: false,
      name: 'Transaction Description',
      value: description,
      sanitize: function sanitize(value) {
        return !value ? '' : String(value).substr(0, 25).trim();
      }
    }]
  }, {
    id: 52,
    required: true,
    name: 'Merchant Category Code',
    value: '0000'
  }, {
    id: 53,
    required: true,
    name: 'Transaction Currency',
    value: '986' // "986" – BRL: real brasileiro - ISO4217

  }, {
    id: 54,
    required: false,
    name: 'Transaction Amount',
    value: amount,
    // Valor em inteiro
    sanitize: function sanitize(value) {
      return !value ? '' : Number.parseFloat(value).toFixed(2);
    }
  }, {
    id: 58,
    required: true,
    name: 'Country Code',
    value: 'BR'
  }, {
    id: 59,
    required: true,
    name: 'Merchant Name',
    value: name,
    sanitize: function sanitize(value) {
      return String(value).substr(0, 25).trim();
    }
  }, {
    id: 60,
    required: true,
    name: 'Merchant City',
    value: city,
    sanitize: function sanitize(value) {
      return String(value).substr(0, 15).trim();
    }
  }, {
    id: 61,
    required: false,
    name: 'Postal Code',
    value: zipcode,
    sanitize: function sanitize(value) {
      return String(value).replace(/[^0-9]+/g, '').substr(0, 15).trim();
    }
  }, {
    id: 62,
    required: true,
    name: 'Aditional Data Field Template',
    children: [{
      id: 5,
      required: true,
      name: 'Reference Label',
      value: txId,
      validation: function validation(value) {
        if (String(value).length > 25) throw new Error('txId não pode ter mais de 25 caracteres');
        if (/[^0-9a-z]+/i.test(value)) throw new Error('txId só permite letras e números');
        return true;
      }
    }, {
      id: 50,
      required: true,
      name: 'Payment System specific template',
      children: [{
        id: 0,
        name: 'Globally Unique Identifier',
        value: 'BR.GOV.BCB.BRCODE'
      }, {
        id: 1,
        name: 'Payment System specific',
        value: '1.0.0'
      }]
    }]
  }];
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


function getLength(text) {
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
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


var getString = function getString() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  //
  var id = options.id,
      value = options.value;
  var name = options.name,
      children = options.children,
      sanitize = options.sanitize,
      validation = options.validation,
      _options$required = options.required,
      required = _options$required === void 0 ? false : _options$required; // Sanitiza o valor, caso exista uma função para isso

  if (sanitize) value = sanitize(value); // É obrigatório mas não tem value nem children definido

  if (required && !value && !children) {
    throw new Error("\"".concat(name, "\" is required"));
  } // Não é obrigatório, não tem value nem children definido


  if (!required && !value && !children) return ''; // Valida, caso exista uma validação

  if (validation) validation(value); // Retira os caracteres especiais

  if (value) value = removeAccent(value); // Transforma o id em uma string com 2 caracteres

  id = pad(id, 2); // Se tiver um children, processe seu conteúdo antes de gerar o valor atual

  if (children) value = children.reduce(function (accu, curr) {
    return accu + getString(curr);
  }, ''); // Devolva id com 2 caractes, o tamanho com 2 caracteres e o valor

  return "".concat(id).concat(getLength(value)).concat(value);
};
/**
 * Devolve o tipo da chave informada
 *
 * getKeyType('170.803.140-54'); // -> 'cpf'
 * getKeyType('170803140-54'); // -> 'cpf'
 * getKeyType('17080314054'); // -> 'cpf'
 * getKeyType('38.262.543/0001-50'); // -> 'cnpj'
 * getKeyType('382625430001-50'); // -> 'cnpj'
 * getKeyType('38262543000150'); // -> 'cnpj'
 * getKeyType('klawdyo@gmail.com'); // -> 'email'
 * getKeyType('+5584996964567'); // -> 'phone'
 * getKeyType('+55 (84) 9 9696-4567'); // -> 'phone'
 * getKeyType('+5584996964567'); // -> 'phone'
 * getKeyType('3066362f-020c-4b46-9c1b-4ee3cf8a1bcc'); // -> 'random'
 *
 * @param {String} pixKey Chave
 * @returns {String} Um do resultados: cpf, cnpj, email, phone, random
 */


function getKeyType(pixKey) {
  var regexes = {
    email: /@/,
    phone: /^\+/,
    cpf: /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/,
    cnpj: /^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/,
    random: /^[0-9a-f]{4,}-[0-9a-f]{4,}-[0-9a-f]{4,}-[0-9a-f]{4,}-[0-9a-f]{4,}$/
  };
  var match = Object.keys(regexes).find(function (key) {
    return regexes[key].test(pixKey);
  });
  return match;
}
/**
 * Devolve o tipo da chave informada
 *
 * sanitizeKey('170.803.140-54'); // -> '17080314054'
 * sanitizeKey('170803140-54'); // -> '17080314054'
 * sanitizeKey('17080314054'); // -> '17080314054'
 * sanitizeKey('38.262.543/0001-50'); // -> '38262543000150'
 * sanitizeKey('382625430001-50'); // -> '38262543000150'
 * sanitizeKey('38262543000150'); // -> '38262543000150'
 * sanitizeKey('klawdyo@gmail.com'); // -> 'klawdyo@gmail.com'
 * sanitizeKey('+5584996964567'); // -> '+5584996964567'
 * sanitizeKey('+55 (84) 9 9696-4567'); // -> '+5584996964567'
 * sanitizeKey('+5584996964567'); // -> '+5584996964567'
 * sanitizeKey('3066362f-020c-4b46-9c1b-4ee3cf8a1bcc'); // -> '3066362f-020c-4b46-9c1b-4ee3cf8a1bcc'
 *
 * @param {String} pixKey Chave
 * @returns {String} Um do resultados: cpf, cnpj, email, phone, random
 */


function sanitizeKey(pixKey) {
  var sanitizable = {
    cpf: {
      rgx: /[^0-9]+/g,
      replace: ''
    },
    cnpj: {
      rgx: /[^0-9]+/g,
      replace: ''
    },
    phone: {
      rgx: /[^+0-9]+/g,
      replace: ''
    }
  };
  var sanitizableKeys = Object.keys(sanitizable);
  var keyType = getKeyType(pixKey);
  return sanitizableKeys.includes(keyType) ? String(pixKey).replace(sanitizable[keyType].rgx, sanitizable[keyType].replace) : pixKey;
}
/**
 * CRC16 é o último trecho do código. É usado para validar o código anterior.
 *
 * @param {String} code  Código do pix copia e cola
 * @returns {String} Trecho de validação do pix
 */


var getCRC = function getCRC(code) {
  return getString({
    id: 63,
    // O código CRC gerado terá 4 caracteres e o ID é 63.
    // Para a geração correta do código, é nenecessário utilizar o "6304" que
    // seria adicionado naturalmente por getString()
    value: CRC("".concat(code, "6304"))
  });
};
/**
 * Gera o código do pix copia e cola
 *
 * @param {Object} params Parâmetros de configuração da venda
 *              {String}  key        : Chave pix do recebedor
 *              {String}  txId       : ID da Transação
 *              {Number}  amount     : Valor da compra
 *              {String}  name       : Nome do comprador
 *              {String}  city       : Cidade da compra
 *              {Integer} zipcode    : CEP da cidade
 *              {String}  description: Descrição da transação
 *              {Boolean} isUnique  : Define se é uma transação única
 * @returns {String} String do pix copia e cola para as configurações definidas.
 */


var pix = function pix(_ref) {
  var name = _ref.name,
      amount = _ref.amount,
      zipcode = _ref.zipcode,
      city = _ref.city,
      txId = _ref.txId,
      key = _ref.key,
      description = _ref.description,
      isUnique = _ref.isUnique;

  try {
    var code = setConfigs({
      key: key,
      name: name,
      amount: amount,
      zipcode: zipcode,
      city: city,
      txId: txId,
      description: description,
      isUnique: isUnique
    }).reduce(function (accu, curr) {
      return accu + getString(curr);
    }, '');
    return code + getCRC(code);
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
/**
 * Retorna o base64 da imagem
 *
 * @param {Object} payload
 * @return {String} Código base64 da imagem
 */


var qrcode = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(payload) {
    var code;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            code = pix(payload);
            return _context.abrupt("return", QRCode.toDataURL(code));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function qrcode(_x) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = {
  pix: pix,
  qrcode: qrcode,
  getKeyType: getKeyType,
  sanitizeKey: sanitizeKey
};
//# sourceMappingURL=pix.js.map