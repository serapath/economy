# Economy

**For now this is just the beginning of a concept...**
Suggestions for improvements are very welcome :-)

Please also check out the [issues](https://github.com/serapath/economy/issues), especially #6 #4 & #3

## GOAL
I'd like to define an easy javascript based `DSL` (=domain specific languages) that is easy to read and allows to translate stories about people doing business in certain ways (e.g. selling goods, taking loans, transfering money) that affect the balance sheets of businesses, banks, governments and even central banks into a series of transactions that represent whats going on. This is usually dont through writing down a series of `accounting records`, but that's not very readable to laymen's eyes, so maybe this can be improved so that it's really easy to use that language while talking about the economy and about whats going on in detail in certain scenarios.

**In general:**
* There are 2 categories of `accounting records`. Those who affect profit/loss and those that dont.
* There are 4 types of `accounting records`.
  * balance sheet extension records (e.g. taking a loan)
  * balance sheet shortening (e.g. paying back a loan)
  * exchanging asset positions (e.g. investing)
  * exchanging liabilities/equity (e.g. a creditor converting into a shareholder)
 
The right side of a balance sheet is traditionally roughly divided into `equity` and `liabilities`, but all listet positions are in some ways very similar.
* `priority` (defines who receives liquidation money first in case of insolvency)
* `return` (called "interest" in case of liabilities and "dividends" in case of equity)
* `voting rights` (usually just for equity, but contract law allows for all kinds of constructions)
* `constraints` (how flexible and "for sure" can the position be sold/liquidated)


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
