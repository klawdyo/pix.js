const { CRC } = require('./crc');
const { pad } = require('./utils');


// Constantes

// GUI - Globally Unique Identifier
const BCB_GUI = 'BR.GOV.BCB.PIX';
// Versão do PIX
const PIX_VERSION = '1.0.0';
// Moeda utilizada - BRL: real brasileiro - ISO4217
const CURRENCY = '986';
// Código de país ISO3166-1 alpha 2
const COUNTRY = 'BR';





/**
 * Retorna a linha digitável do pix
 */
function pix(payload = {}) {

  let {
    // Obrigatórios
    // Chave que receberá o pagamento
    key = null,
    // Nome da pessoa cobrada. Máximo de 25 caracteres sem acentos
    name = null,
    // Cidade da transação. Se for transação online, pode ser tanto a 
    // cidade da compra ou da venda. Sem acentos.
    city = null,
    // Valor da transação no formato "0" ou "1.00" ou "1234.56"
    amount = null,
    // CEP da cidade da compra ou da venda. Com ou sem -
    zipcode = null,
    // Código da transação
    txId = null,

  } = payload;

  // 
  name = name.substr(0, 25).trim()
  city = city.substr(0, 15).trim()

  const _ = ''
  const code = [
    // Payload Format Indicator
    // Versão do payload QRCPS-MPM, fixo em "01"
    // Obrigatório = true
    '00', // Id do elemento
    '02', // Tamanho do próximo bloco
    '01', // Valor fixo em "01"


    _,

    // Point of Initiation Method (Opcional)
    // Obrigatório = false
    '01', // Id do elemento
    '02', // Tamanho do próximo bloco
    '12', // 12 significa só pode ser usado uma vez

    _,

    // Merchant Account Information
    // Obrigatório = true
    '26', // ID: 26 é "possui arranjo específico", ou seja, segue o padrão do PIX
    // Ex.: 0014BR.GOV.BCB.PIX0117klawdyo@gmail.com = 39 caracteres
    // 0014 = 4 caracteres + tamanho do BCB_GUI + 0117 = 4 caracteres + Tamanho da chave
    (4 + BCB_GUI.length + 4 + key.length),

    // Arranjo: Código que informa que pertence ao banco central do brasil
    '00', /*ID da GUI*/
    /*Tamanho do arranjo específico*/
    BCB_GUI.length, /*Arranjo específico*/
    BCB_GUI,

    _,

    // Chave
    '01', // ID do elemento
    pad(key.length, 2), // Tamanho da chave
    key, // Chave

    _,

    // Merchant category code
    // Obrigatório = true
    '52', // ID do elemento
    '04', // Tamanho
    '0000',// Código fixo em 0000

    _,

    // Moeda: “986” – BRL: real brasileiro - ISO4217
    // Obrigatório = true
    '53', // ID do elemento
    pad(CURRENCY.length, 2), // Tamanho da moeda
    CURRENCY, // Código fixo em 0000

    _,

    // Valor da transação: Ex. "0", "1.00" ou "123.99"
    // Obrigatório = false
    '54', // ID do pedaço do código
    pad(Number(amount).toFixed(2).length, 2), // Tamanho do valor da transação
    Number(amount).toFixed(2), // Valor da transação com "." como separador decimal

    _,
    // Código da moeda utilizada
    // Obrigatório = true
    '58', // ID
    pad(COUNTRY.length, 2), // Tamanho 
    COUNTRY,// Valor do item 


    _,
    // nome do pagador
    // Obrigatório = true
    '59', // Id do elemento
    pad(name.length, 2), // Tamanho do nome do pagador*
    name, // Nome do pagador com o máximo de 25 caracteres


    _,
    // cidade onde é efetuada a transação. Em transações online
    // pode ser utilizada a cidade da agência do recebedor ou a cidade-sede do recebedor
    // Obrigatório = true
    '60', // Id do elemento
    pad(city.length, 2), // Tamanho do nome da cidade
    city, // Nome da cidade com o máximo de 15 caracteres


    _,
    // CEP da localidade onde é efetuada a transação
    // Obrigatório = false
    '61', // ID
    pad(String(zipcode).length, 2), // Tamanho
    zipcode, // Valor do item


    _,
    // Campos de dados adicionais
    // Obrigatório = true
    '62', // Id do elemento
    pad(4 + String(txId).length, 2), /* Tamanho do próximo item: 0505 tem 4 caracteres + o item */
         // ID da transação
         /* */ '05', // Id do sub elemento
         /* */ pad(txId.length, 2), // Tamanho do código da transação
         /* */ txId, // Código da Transação
    // Template específico do sistema de pagamento
    // Valor fixo
    // id=50, 30 caracteres a seguir:
    // id=00, 17 carac em BR.GOV.BCB.BRCODE = 0017BR.GOV.BCB.BRCODE
    // id=01, 05 caracteres em 1.0.0 = 01051.0.0
    //'50300017BR.GOV.BCB.BRCODE01051.0.0',

    _,
    // Código CRC16
    '63', // Id do elemento
    '04', // Tamanho do código CRC16 gerado

  ].join('')


  return code + CRC(code);

}

/**
 * Retorna a base da imagem
 * @param {*} payload 
 */
var QRCode = require('qrcode')
const qrcode = async (payload) => {
  try {
    const code = pix(payload);
    return QRCode.toDataURL(code);
  } catch (err) {
    console.error(err)
  }
}



module.exports = {
  pix,
  qrcode,
}
