/******************************************************************************
  DEPENDENCIES
******************************************************************************/
var getval      = require('getval');
/******************************************************************************
  PARAMETER = ARGUMENT
******************************************************************************/
  // no cli tool
/******************************************************************************
  EXPORT
******************************************************************************/
module.exports  = economy;
/******************************************************************************
  EXECUTION
******************************************************************************/
var _default = require('_default');
function economy (parameter) {
  var BALANCE = _default.BALANCE;
  if (parameter) {
    BALANCE = parameter.BALANCE || BALANCE;
  }
  var history    = [];
  var Tnow       = 0;
  var Tnext      = 1;
  history[Tnow]  = { economy: {}, journal: [] };
  history[Tnext] = { economy: {}, journal: [] };
  var currentEconomy, currentJournal, transaction;
  function actor (name) {
    if (history[Tnext].economy[name]) return;
    history[Tnext].economy[name] = JSON.parse(JSON.stringify(BALANCE));
  }
  function execute (transactions) {
    currentEconomy = history[Tnext].economy;
    currentJournal = history[Tnow].journal;
    function batch (trans) {
      var target = getval(currentEconomy, trans[0]);
      var current = target[trans[1]];
      target[trans[1]]  = current ? current+=trans[2] : trans[2];
      console.log(trans[0]+'.'+trans[1]+ ':' + trans[2]);
    }
    transactions.forEach(batch);
    Tnow++; Tnext++;
    history[Tnext] = {
      economy: JSON.parse(JSON.stringify(history[Tnow].economy)),
      journal: []
    };
  }
  function snapshot (from, to) {
    var from = from || 0;
    var to   = to   || history.length;
    return JSON.parse(JSON.stringify(history.slice(from,to)));
  }
  var api = {
    actor   : actor,
    execute : execute,
    snapshot: snapshot
  };
  return api;
}
