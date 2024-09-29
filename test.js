"use strict"
const { SMS, adapters } = require('./index');

const ippanel = new SMS(new adapters.IPPanel({
  apiKey: 'Your Api key',
}));

ippanel.send('Mobile_Number', 'Hello', '3000505').then((res) => {
  console.log(res);
});
