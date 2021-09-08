"use strict";

/* eslint-disable eqeqeq */

/* eslint-disable no-plusplus */

/* eslint-disable camelcase */

/* eslint-disable no-param-reassign */
var pad = function pad(value) {
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return String(value).padStart(length, '0');
};

var removeAccent = function removeAccent(str) {
  str = String(str);
  var com_acento = 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ';
  var sem_acento = 'AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr';
  var novastr = '';

  for (var i = 0; i < str.length; i++) {
    var troca = false;

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
};

module.exports = {
  pad: pad,
  removeAccent: removeAccent
};
//# sourceMappingURL=utils.js.map