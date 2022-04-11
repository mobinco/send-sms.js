"use strict"

const test = require('tape');
const sendSms = require('./index');
let sms;

test('bare adapter will throw an error', (t) => {
  t.plan(1);
  var adapter = new sendSms.Adapter();
  try {
    adapter.request();
  } catch (err) {
    t.equal(err.message, 'not implemented');
  }
  t.end();
});

test('construct sms instance', (t) => {
  t.plan(2);
  var smsbao = new sendSms.adapters.IPPanel({
    apiKey: 'your api key',
  });
  sms = new sendSms.SMS(smsbao);
  t.equal('zimend.com');
  t.deepEqual(sms.adapter, smsbao);
  t.end();
});

