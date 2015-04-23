# Economy
```js
  var economy = require('economy');
  var e       = economy(/*pass in custom balance sheet schema if wanted*/);

  e.actor('BANK');
  e.actor('alex');
  period  = [
    // alex drills a well in the desert
    ['alex.ASSETS.PROPERTY.TANGIBLES.FIXED','well', +1000],
    ['alex.OWNERSHIP.EQUITY',               'value',+1000],
    // alex takes a loan, because he needs money to buy food
    ['alex.OWNERSHIP.LIABILITIES',          'BANK', +1000], // interest maybe 5% each year
    ['alex.ASSETS.MONEY.CASH',              'value',+1000],
    ['BANK.ASSETS.MONEY.CLAIMS',            'alex', +1000], // takes alex "WELL" as security
    ['BANK.OWNERSHIP.LIABILITIES','alexBankAccount',+1000]
  ];
  e.execute(period);


  e.actor('BANK');
  e.actor('alex');
  e.actor('nick');
  period  = [
    // nick goes to the forrest, collects wood and builds a table
    ['nick.ASSETS.PROPERTY.TANGIBLES.CURRENT','table',          +500],
    ['nick.OWNERSHIP.EQUITY',                 'value',          +500],
    // nick sells table to alex
    ['nick.ASSETS.MONEY.CASH',                'value',          +700],
    ['nick.ASSETS.PROPERTY.TANGIBLES.CURRENT','table',          -500],
    ['nick.OWNERSHIP.EQUITY',                 'value',          +200],
    ['BANK.OWNERSHIP.LIABILITIES',            'alexBankAccount',-700],
    ['BANK.OWNERSHIP.LIABILITIES',            'nickBankAccount',+700],
    ['alex.ASSETS.MONEY.CASH',                'value',          -700],
    ['alex.ASSETS.PROPERTY.TANGIBLES.CURRENT','table',          +700]
  ];
  e.execute(period);


  console.log(e.snapshot());
```
