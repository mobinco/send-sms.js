"use strict"
const { SMS, adapters } = require('./index');

const ippanel = new SMS(new adapters.IPPanel({
  apiKey: 'VI50QJJ-AYGFHQi3yz7wwc9XdtcNY-nxDAZpLPrwn6o=',
}));

ippanel.send('Mobile_Number', 'Hello', '3000505').then((res) => {
  console.log(res);
});
