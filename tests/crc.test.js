const test = require('tape')
const { CRC } = require('../dist/crc')


test('Converte string para o formato CRC16', t => {
  // console.log(CRC(12345678))
  t.equal(CRC(12345678), 'A12B')
  t.equal(CRC('00020101021226390014BR.GOV.BCB.PIX0117klawdyo@gmail.com52040000530398654041.005802BR5924Jose Claudio Medeiros de6006AssuRN61085965000062200516SINASEFE-18/20216304'), 'EB13')

  t.end()
})
