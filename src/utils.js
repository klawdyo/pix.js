const pad = (value, length = 2) => String(value).padStart(length, '0');


const removeAccent = (str) => {
  str = String(str)
  const com_acento =
    'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ';

  const sem_acento =
    'AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr';
  let novastr = '';
  for (var i = 0; i < str.length; i++) {
    let troca = false;
    for (var a = 0; a < com_acento.length; a++) {
      if (str.substr(i, 1) == com_acento.substr(a, 1)) {
        novastr += sem_acento.substr(a, 1);
        troca = true;
        break;
      }
    }
    if (troca == false) {
      novastr += str.substr(i, 1);
    }
  }
  return novastr;
}

module.exports = {
  pad, removeAccent
}
