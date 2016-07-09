# Scenario - [Sensorica 3D printer](https://github.com/valueflows/valueflows/blob/master/use-cases/3d-printer.md)

* http://requirebin.com/?gist=01d39d31f218a6a4f429cccbe7b91e80

## Description in `english`
> See:
> https://github.com/valueflows/valueflows/blob/master/use-cases/3d-printer.md

##### Economic Participants
* Kim, Ali, Fatuma, Daniel, Jim, Sensorica, CAKE, Exchange Inc., Royal Bank of Canada, Random Customer, PP Inc., ORD and UPS

##### Contract Relationships
* Sensorica and Exchange Inc. are departments of CAKE
* Kim, Ali, Fatuma, Daniel, Jim, Exchange Inc., Random Customer, PP Inc., CAKE, ORD and UPS all have bank accounts at Royal Bank of Canada
* Kim, Ali, Fatuma, Daniel, Jim have membership contracts with CAKE to be active in the Sensorica business unit and each owns shares worth 2000$
* Kim, Ali, Fatuma, Daniel, Jim each currently have 2000$ worth of membership shares in CAKE

##### Pre-Process
1. Ali invests Sensorica shares worth 500$ into Sensoricas 3d printer fund
* Kim invests Sensorica shares worth 1000$ into Sensoricas 3d printer fund
* Fatuma invests 1500$ from her bank account at Royal Bank of Canada into a Sensorica printer fund
* Sensorica uses printerfund to order a 3D printer for 3000$ from ORD
* Sensorica pays the invoice from it's bank account at Royal Bank of Canada
* Sensorica receives 3D printer from ORD, who paid 20$ to UPS for shipping

* Daniel invests 30$ to order 1000g photopolymer from PP Inc. via Sensorica
* Daniel buys 1000g photopolymer for 30$ from PP Inc. to ship it to Sensorica
* Daniel pays the invoice from his bank account at Royal Bank of Canada
* Sensorica receives 1000g photopolymer at it's lab
* Kim works 3h into Sensorica accounting for Sensorica

##### Process 1
1. Daniel works 20h to design a 3D model/blueprint for Sensorica

##### Process 2
1. Jim invests 2h to create a 3D printed part by using the 3D printer, 100g/1000g photopolymer and Sensoricas 3D model

##### Sale
1. Sensorica offers the 3D printed part for 100$ through Exchange Inc. marketplace
* Random Customer buys 3D printed part for 100$ on Exchange Inc. marketplace
* Random Customer pays 100$ through his bank account at Royal bank of Canada to CAKE's bank account at Royal bank of Canada
* CAKE ships 3D printed part to Random Customer for 5$ via UPS

##### Distribution
1. Exchange Inc. invoices CAKE 0.01*100$ for Sale of 3D printed part
* Sensorica receives $5 (5%) for general network expenses, e.g. UPS shipping.
* Daniel receives $3 for Photopolymer (based on the cost per gram)
* Daniel receives $20 for Design for 3D printed part (20% of selling price)
* Ali receives $5 for PrinterFund (printer gets paid at $15/hour, gets split among contributors)
* Kim receives $10 for PrinterFund
* Kim receives $1 for MonthlySensoricaPrinterFundAccounting (based on some rule, let's say 1% of sale until reaching $20/hour)
* Fatuma receives $15 for PrinterFund
* Jim receives $40 for PrinterOperation his work and initiative for the sale (the rest)

## Description in `Financial Accounting`
```js
/******************************************************************************
  HELPER
******************************************************************************/
var apply=J=>J.forEach(b=>b.forEach(e=>e[0][e[1]]?e[0][e[1]]+=e[2]:e[0][e[1]]=e[2]))
var log=E=>console.log(E)
/******************************************************************************
  "VALUE EQUATIONS"
******************************************************************************/
CONTRACT = {
  purchaseOrder: ({seller, buyer, receiver=buyer, price, amount=1, subject, dependencies=[]}={}) => ({
    shippingRequest: `${seller} ships ${amount} ${subject} to ${buyer}`,
    invoice: `${buyer} pays ${price}$ to ${seller}`
  }),
  membership: ({name, x}={}) => `
    ${name} is member of Sensorica starting with a "capital account of" ${x}.
    ${name} can work on authorized tasks and get paid at a task specific rate.
    ${name} can fill up a "capital account" through contributions by acting as independent micro investors (investing money into a Sensorica cause) and/or micro entrepreneurs (=investing time into a Sensorica cause).
    ${name} will receives dividends based on revenue directly or indirectly caused by such a cause. Contributions and the distribution of revenue is subject to Sensorica "contribution contracts" (=value equations) members can join by investing time/money into causes.
    They can be of type: 'debt-like', 'equity-like', 'one-time'
  `,
  work: ({name, x, activity, rate = 20}={}) => `
    ${name} works for ${x} hours on ${activity} for ${x*rate} $ by CAKE.
  `,
  affiliate: ({name, service, x, rate = 0.01, dependencies = []}={}) => `
    Exchange Inc. offers ${service} to ${name} to sell for ${x} taking 0.01 in case of success.
  `,
  // Investment Contract (= value equation)
  // => defined "democratically" by Sensorica project members
  // TYPE: debt-like
  investment: ({name, x, subject, amount=1, rate = 1.2}={}) => `
    ${name} invested ${x}$ into a Sensorica project for ${subject} and will
    receive dividends from it's commercial use until the ${subject} is used up or
    the received income (=Return On Invest) reaches ${x*rate}, after which further usage will become part of the Sensorica commons.

    // (printer gets paid at $15/hour, gets split among contributors)
  `,
  // Entrepreneursip Contract (= value equation)
  // => defined "democratically" by Sensorica project members
  // TYPE: debt-like
  entrepreneurship: ({name, x, subject, rate = 20, dependencies = []}={}) => `
    ${name} invested ${x}h into a Sensorica project for ${subject} and will
    receive dividends from it's commercial use until the ${subject} is used up or
    the received income (=Return On Invest) reaches ${x*rate}, after which further usage will become part of the Sensorica commons.
    ${dependencies.length ?
      `20% of Potential payment also needs to be distributed to:
        * ${dependencies.join('\n * ')}}
      ` : ''
    }
  `
}
/******************************************************************************
  BALANCE SHEETS
    * assets: // contains a priced inventory
    * capital: // contains liabilities, equity and other capital positions
    * off: // Off balance sheet positions, such as contracts
           // => might trigger/generate capital or asset changing events
******************************************************************************/
with (CONTRACT) {
  ECONOMY = {
    'RBC': { // Royal Bank of Canada
      assets: { /* ... */ },
      capital: {
        // ...
        'liability/Kim/$'             : +1000,
        'liability/Jim/$'             : +1500,
        'liability/Ali/$'             : +2000,
        'liability/Daniel/$'          : +2500,
        'liability/Fatuma/$'          : +3000,
        'liability/Random Customer/$' : +5000,
        'liability/PP Inc./$'         : +15000,
        'liability/ORD/$'             : +25000,
        'liability/CAKE/$'            : +27000,
        'liability/UPS/$'             : +500000
        // ...
      },
      off: { /* ... */ }
    },
    'UPS': {
      assets: {
        'claim/RBC/account/$' : +500000,
      },
      capital: { /* ... */ },
      off: { /* ... */ }
    },
    'PP': {
      assets: {
        'claim/RBC/account/$' : +15000,
      },
      capital: { /* ... */ },
      off: { /* ... */ }
    },
    'ORD': {
      assets: {
        'claim/RBC/account/$'   : +25000,
        'inventory/3Dprinter/$' : +3000,
      },
      capital: { 'equity/$' : +28000 },
      off: { /* ... */ }
    },
    'CAKE': {
      assets: {
        'claim/RBC/account/$'               : +12000,
        'claim/RBC/account/Sensorica/$'     : +10000,
        'claim/RBC/account/Exchange Inc./$' : +5000
      },
      capital: {
        // ...
        'equity/Sensorica/Ali/$'    : +2000,
        'equity/Sensorica/Fatuma/$' : +2000,
        'equity/Sensorica/Kim/$'    : +2000,
        'equity/Sensorica/Daniel/$' : +2000,
        'equity/Sensorica/Jim/$'    : +2000
      },
      off: {
        // ...
        'contract/Sensorica/Ali/membership'   : membership({name:'Ali',x:2000}),
        'contract/Sensorica/Kim/membership'   : membership({name:'Kim',x:2000}),
        'contract/Sensorica/Fatuma/membership': membership({name:'Fatuma',x:2000}),
        'contract/Sensorica/Daniel/membership': membership({name:'Daniel',x:2000}),
        'contract/Sensorica/Jim/membership'   : membership({name:'Jim',x:2000})
      }
    },
    'Ali': {
      assets: {
        'claim/RBC/account/$' : +2000,
        'shares/Sensorica/$'  : +2000
      },
      capital: { 'equity/$': +4000 },
      off: { /* ... */ }
    },
    'Fatuma': {
      assets: {
        'claim/RBC/account/$' : +3000,
        'shares/Sensorica/$'  : +2000
      },
      capital: { 'equity/$': +5000 },
      off: { /* ... */ }
    },
    'Kim': {
      assets: {
        'claim/RBC/account/$' : +1000,
        'shares/Sensorica/$'  : +2000
      },
      capital: { 'equity/$': +3000 },
      off: { /* ... */ }
    },
    'Jim': {
      assets: {
        'claim/RBC/account/$' : +1500,
        'shares/Sensorica/$'  : +2000
      },
      capital: { 'equity/$': +3500 },
      off: { /* ... */ }
    },
    'Daniel': {
      assets: {
        'claim/RBC/account/$' : +2500,
        'shares/Sensorica/$'  : +2000
      },
      capital: { 'equity/$': +4500 },
      off: { /* ... */ }
    },
    'RC': { // Random Customer
      assets: {
        'claim/RBC/account/$' : +5000
      },
      capital: { 'equity/$': +5000 },
      off: { /* ... */ }
    }
  }
}
/******************************************************************************
  JOURNAL
******************************************************************************/
log(ECONOMY)
with (ECONOMY) { /* and */ with (CONTRACT) {
  JOURNAL = [
    /**************************************************************************
      PRE PROCESS
    **************************************************************************/
    // Ali invests Sensorica shares worth 500$ into Sensoricas 3d printer fund
    ((amount, contract) => [
      [Ali.assets,        'shares/Sensorica/$',               -amount],
      [Ali.assets,        'shares/Sensorica/printerfund/$',   +amount],
      [Ali.off,           'contract/Sensorica/printerfund',   contract],
      [CAKE.capital,      'equity/Sensorica/Ali/$',           -amount],
      [CAKE.capital,      'provision/Sensorica/3Dprinter/$',  +amount],
      [CAKE.off,          'contract/Ali/printerfund',         contract]
    ])(500, investment({name:'Ali',x:500,subject:'3Dprinter'})),
    // Kim invests Sensorica shares worth 1000$ into Sensoricas 3d printer fund
    ((amount, contract) => [
      [Kim.assets,        'shares/Sensorica/$',               -amount],
      [Kim.assets,        'shares/Sensorica/printerfund/$',   +amount],
      [Kim.off,           'contract/Sensorica/printerfund',   contract],
      [CAKE.capital,      'equity/Sensorica/Kim/$',           -amount],
      [CAKE.capital,      'provision/Sensorica/3Dprinter/$',  +amount],
      [CAKE.off,          'contract/Kim/printerfund',         contract]
    ])(1000, investment({name:'Kim',x:1000,subject:'3Dprinter'})),
    // Fatuma invests 1500$ from her bank account at Royal Bank of Canada into a Sensorica printer fund
    ((amount, contract) => [
      [Fatuma.assets,     'claim/RBC/account/$',              -amount],
      [Fatuma.assets,     'shares/Sensorica/printerfund/$',   +amount],
      [Fatuma.off,        'contract/Sensorica/printerfund',   contract],
      [RBC.capital,       'liability/Fatuma/$',               -amount],
      [RBC.capital,       'liability/CAKE/$',                 +amount],
      [CAKE.assets,       'claim/RBC/account/Sensorica/$',    +amount],
      [CAKE.capital,      'provision/Sensorica/3Dprinter/$',  +amount],
      [CAKE.off,          'contract/Fatuma/printerfund',      contract]
    ])(1500, investment({name:'Fatuma',x:1500,subject:'3Dprinter'})),
    // Sensorica uses printerfund to order a 3D printer for 3000$ from ORD
    ((amount, contract) => [
      [CAKE.assets,       'claim/ORD/3Dprinter/$',            +amount],
      [CAKE.capital,      'liability/ORD/$',                  +amount],
      [CAKE.capital,      'provision/Sensorica/3Dprinter/$',  -amount],
      [CAKE.capital,      'equity/Sensorica/$',               +amount],
      [CAKE.off,          'contract/ORD/purchase/3Dprinter',  contract],
      [ORD.assets,        'claim/CAKE/$',                     +amount],
      [ORD.capital,       'liability/CAKE/3Dprinter/$',       +amount],
      [ORD.off,           'contract/CAKE/sale/3Dprinter',     contract]
    ])(3000, purchaseOrder({seller:'ORD', buyer:'CAKE', price:3000, amount:'1x', subject:'3Dprinter'})),
    // Sensorica pays the invoice from it's bank account at Royal Bank of Canada
    ((amount, contract) => [
      [CAKE.assets,       'claim/RBC/account/Sensorica/$',    -amount],
      [CAKE.capital,      'liability/ORD/$',                  -amount],
      [RBC.capital,       'liability/CAKE/$',                 -amount],
      [RBC.capital,       'liability/ORD/$',                  +amount],
      [ORD.assets,        'claim/RBC/account/$',              +amount],
      [ORD.assets,        'claim/CAKE/$',                     -amount]
    ])(3000),
    // Sensorica receives 3D printer from ORD, who paid 20$ to UPS for shipping
    ((amount, contract) => [
      [CAKE.assets,       'claim/ORD/3Dprinter/$',            -amount],
      [CAKE.assets,       'inventory/Sensorica/3Dprinter/$',  +amount],
      [RBC.capital,       'liability/ORD/$',                  -20],
      [RBC.capital,       'liability/UPS/$',                  +20],
      [UPS.assets,        'claim/RBC/account/$',              +20],
      [UPS.capital,       'equity/$',                         +20],
      [UPS.off,           'contract/ORD/shipping',            contract],
      [ORD.assets,        'inventory/3Dprinter/$',            -amount],
      [ORD.assets,        'liability/CAKE/3Dprinter/$',       -amount],
      [ORD.off,           'contract/UPS/shipping',            contract]
    ])(3000, purchaseOrder({seller:'UPS',buyer:'ORD',receiver:'CAKE',price:20,subject:'3Dprinter'})),
    // Daniel invests 30$ to order 1000g photopolymer from PP Inc. via Sensorica
    ((amount, contract) => [
      [Daniel.assets,  'shares/Sensorica/photopolymer/$',     +amount],
      [Daniel.capital, 'liability/Sensorica/photopolymer/$',  +amount],
      [Daniel.off,     'contract/Sensorica/photopolymer',     contract],
      [CAKE.assets,    'claim/Daniel/photopolymer/$',         +amount],
      [CAKE.capital,   'equity/Sensorica/$',                  +amount],
      [CAKE.off,       'contract/Daniel/photopolymer/$',      contract]
    ])(30, investment({name:'Daniel',x:30,subject:'photopolymer', amount:'1000g'})),
    // Daniel buys 1000g photopolymer for 30$ from PP Inc. to ship it to Sensorica
    ((amount, contract) => [
      [Daniel.assets,  'claim/PP Inc./photopolymer/$',        +amount],
      [Daniel.capital, 'liability/PP Inc./$',                 +amount],
      [Daniel.off,     'contract/PP/purchase/photopolymer/$', contract],
      [PP.assets,      'claim/Daniel/$',                      +amount],
      [PP.capital,     'liability/CAKE/photopolymer/$',       +amount],
      [PP.off,         'contract/Daniel/sale/photopolymer/$', contract]
    ])(30, purchaseOrder({seller:'PP',buyer:'Daniel',receiver:'CAKE',price:30,amount:'1000g',subject:'photopolymer'})),
    // Daniel pays the invoice from his bank account at Royal Bank of Canada
    ((amount) => [
      [Daniel.assets,     'claim/RBC/account/$',              -amount],
      [Daniel.assets,     'liability/PP Inc./$'               -amount],
      [RBC.capital,       'liability/Daniel/$',               -amount],
      [RBC.capital,       'liability/PP Inc./$',              +amount],
      [PP.assets,         'claim/Daniel/$',                   -amount],
      [PP.assets,         'claim/RBC/account/$',              +amount]
    ])(30),
    // Sensorica receives 1000g photopolymer at it's lab
    ((amount) => [
      [Daniel.assets,  'claim/PP Inc./photopolymer/$',        -amount],
      [Daniel.capital, 'liability/Sensorica/photopolymer/$',  -amount],
      [CAKE.assets,    'inventory/Sensorica/photopolymer/$',  +amount],
      [CAKE.assets,    'claim/Daniel/photopolymer/$',         -amount]
    ])(30),
    // Kim works 3h into Sensorica accounting for Sensorica
    ((amount, contract) => [
      [Kim.assets,     'claim/Sensorica/$',                   +amount],
      [Kim.capital,    'equity/Kim/$',                        +amount],
      [Kim.off,        'contract/Sensorica/accounting/$',     contract],
      [CAKE.capital,   'equity/Sensorica/$',                  -amount],
      [CAKE.capital,   'liability/Kim/$',                     +amount],
      [CAKE.off,       'contract/Kim/accounting/$',           contract]
    ])(60, work({name:'Kim',x:3,activity:'Sensorica Accounting'})),
    /**************************************************************************
      PROCESS 1
    **************************************************************************/
    // Daniel invests 20h to design a 3D model/blueprint for Sensorica
    ((contract) => [
      [Daniel.off,     'contract/Sensorica/3Dmodel/$',        contract],
      [CAKE.off,       'contract/Daniel/3Dmodel/$',           contract]
    ])(entrepreneurship({name:'Daniel',x:20,subject:'3Dmodel'})),
    /**************************************************************************
      PROCESS 2
    **************************************************************************/
    // Jim invests 2h to create a 3D printed part by using the 3D printer, 100g/1000g photopolymer and Sensoricas 3D model
    ((amount, contract) => [
      [Jim.off,        'contract/Sensorica/3Dpart/$',         contract],
      [CAKE.assets,    'inventory/Sensorica/photopolymer/$',  -(100*30/1000)],
      [CAKE.assets,    'inventory/Sensorica/3Dpart/$',        +(3+amount)],
      [CAKE.capital,   'provision/revenue/3Dpart',            +amount],
      [CAKE.off,       'contract/Jim/3Dpart/$',               contract]
    ])(2*20, entrepreneurship({name:'Jim',x:2,subject:'3Dpart',dependencies:[
      CAKE.off['contract/CAKE/sale/3Dprinter'],
      CAKE.off['contract/Daniel/photopolymer/$'],
      CAKE.off['contract/Daniel/3Dmodel/$']
    ]})),
    /**************************************************************************
      SALE
    **************************************************************************/
    // Sensorica offers the 3D printed part for 100$ through Exchange Inc. marketplace
    ((amount, contract) => [
      [CAKE.assets,    'inventory/Sensorica/3Dpart/$',        -0.4*amount],
      [CAKE.assets,    'offer/Exchange/3Dpart/$',             +amount],
      [CAKE.capital,   'provision/revenue/3Dpart',            +0.6*amount],
      [CAKE.off,       'contract/Exchange Inc./affiliate',    contract]
    ])(100, affiliate({name:'Exchange Inc.',service:'Marketplace',x:100,dependencies:[
      CAKE.off['contract/Jim/3Dpart']
    ]})),
    // Random Customer buys 3D printed part for 100$ on Exchange Inc. marketplace
    ((amount, contract) => [
      [RC.assets,       'claim/CAKE/3Dpart/$',                +amount],
      [RC.capital,      'liability/CAKE/$',                   +amount],
      [RC.off,     'contract/Random Customer/purchase/3Dpart',contract],
      [CAKE.assets,    'claim/Random Customer/$',             +amount],
      [CAKE.capital,   'liability/Random Customer/3Dpart/$',  +amount],
      [CAKE.off,   'contract/Random Customer/purchase/3Dpart',contract]
    ])(100, purchaseOrder({seller:'CAKE',buyer:'Random Customer',price:100,subject:'3Dpart',dependencies:[
      CAKE.off['contract/Exchange Inc./affiliate']
    ]})),
    // Random Customer pays 100$ through his bank account at Royal bank of Canada to CAKE's bank account at Royal bank of Canada
    ((amount) => [
      [RC.assets,      'claim/RBC/account/$',                 -amount],
      [RC.capital,     'liability/CAKE/$',                    -amount],
      [RBC.capital,    'liability/Random Customer/$',         -amount],
      [RBC.capital,    'liability/CAKE/$',                    +amount],
      [CAKE.assets,    'claim/RBC/account/$',                 +amount],
      [CAKE.assets,    'claim/Random Customer/$',             -amount]
    ])(100),
    // CAKE ships 3D printed part to Random Customer for 5$ via UPS
    ((amount, contract) => [
      [RC.assets,      'inventory/3Dpart/$',                  +amount],
      [RC.assets,      'claim/CAKE/3Dpart/$',                 -amount],
      [RBC.capital,    'liability/CAKE/$',                    -5],
      [RBC.capital,    'liability/UPS/$',                     +5],
      [UPS.assets,     'claim/RBC/account/$',                 +5],
      [UPS.capital,    'equity/$',                            +5],
      [UPS.off,        'contract/ORD/shipping',               contract],
      [CAKE.assets,    'offer/Exchange/3Dpart/$',             -amount],
      [CAKE.capital,   'liability/Random Customer/3Dpart/$',  -amount],
      [CAKE.off,       'contract/UPS/shipping',                contract]
    ])(100, purchaseOrder({seller:'UPS',buyer:'CAKE',receiver:'RC',price:5,subject:'3Dpart'})),
    /**************************************************************************
      DISTRIBUTION
    **************************************************************************/
    // Exchange Inc. invoices CAKE 0.01*100$ for Sale of 3D printed part
    ((amount) => [
      [CAKE.assets,    'claim/RBC/account/$',                 -0.01*amount],
      [CAKE.assets,    'claim/RBC/account/Exchange Inc./$',   +0.01*amount],
      [CAKE.capital,   'provision/revenue/3Dpart',            -0.01*amount],
      [CAKE.capital,   'equity/$',                            +0.01*amount]
    ])(100),
    // Sensorica receives $5 (5%) for general network expenses, e.g. UPS shipping.
    ((amount) => [
      [CAKE.assets,    'claim/RBC/account/$',                 -0.05*amount],
      [CAKE.assets,    'claim/RBC/account/Sensorica/$',       +0.05*amount],
      [CAKE.capital,   'provision/revenue/3Dpart',            -0.05*amount],
      [CAKE.capital,   'equity/$',                            +0.05*amount]
    ])(100),
    // Daniel receives $3 for Photopolymer (based on the cost per gram)
    ((amount) => [
      [CAKE.assets,    'claim/RBC/account/$',                 -0.03*amount],
      [CAKE.assets,    'claim/RBC/account/Sensorica/$',       +0.03*amount],
      [CAKE.capital,   'provision/revenue/3Dpart',            -0.03*amount],
      [CAKE.capital,   'equity/Sensorica/Daniel/$',           +0.03*amount]
    ])(100),
    // Daniel receives $20 for Design for 3D printed part (20% of selling price)
    ((amount) => [
      [CAKE.assets,    'claim/RBC/account/$',                 -0.2*amount],
      [CAKE.assets,    'claim/RBC/account/Sensorica/$',       +0.2*amount],
      [CAKE.capital,   'provision/revenue/3Dpart',            -0.2*amount],
      [CAKE.capital,   'equity/Sensorica/Daniel/$',           +0.2*amount]
    ])(100),
    // Ali receives $5 for PrinterFund (printer gets paid at $15/hour, gets split among contributors)
    ((amount) => [
      [CAKE.assets,    'claim/RBC/account/$',                 -0.05*amount],
      [CAKE.assets,    'claim/RBC/account/Sensorica/$',       +0.05*amount],
      [CAKE.capital,   'provision/revenue/3Dpart',            -0.05*amount],
      [CAKE.capital,   'equity/Sensorica/Ali/$',              +0.05*amount]
    ])(100),
    // Kim receives $10 for PrinterFund
    ((amount) => [
      [CAKE.assets,    'claim/RBC/account/$',                 -0.1*amount],
      [CAKE.assets,    'claim/RBC/account/Sensorica/$',       +0.1*amount],
      [CAKE.capital,   'provision/revenue/3Dpart',            -0.1*amount],
      [CAKE.capital,   'equity/Sensorica/Kim/$',              +0.1*amount]
    ])(100),
    // Fatuma receives $15 for PrinterFund
    ((amount) => [
      [CAKE.assets,    'claim/RBC/account/$',                 -0.15*amount],
      [CAKE.assets,    'claim/RBC/account/Sensorica/$',       +0.15*amount],
      [CAKE.capital,   'provision/revenue/3Dpart',            -0.15*amount],
      [CAKE.capital,   'equity/Sensorica/Fatuma/$',           +0.15*amount]
    ])(100),
    // Kim receives $1 for MonthlySensoricaPrinterFundAccounting (based on some rule, let's say 1% of sale until reaching $20/hour)
    ((amount) => [
      [CAKE.assets,    'claim/RBC/account/$',                 -0.01*amount],
      [CAKE.assets,    'claim/RBC/account/Sensorica/$',       +0.01*amount],
      [CAKE.capital,   'provision/revenue/3Dpart',            -0.01*amount],
      [CAKE.capital,   'equity/Sensorica/Kim/$',              +0.01*amount]
    ])(100),
    // Jim receives $40 for PrinterOperation his work and initiative for the sale (the rest)
    ((amount) => [
      [CAKE.assets,    'claim/RBC/account/$',                 -0.4*amount],
      [CAKE.assets,    'claim/RBC/account/Sensorica/$',       +0.4*amount],
      [CAKE.capital,   'provision/revenue/3Dpart',            -0.4*amount],
      [CAKE.capital,   'equity/Sensorica/Jim/$',              +0.4*amount]
    ])(100)
  ]
}}
apply(JOURNAL)
log(ECONOMY)
```

## Description in `REA`
```js
// @TODO
```
