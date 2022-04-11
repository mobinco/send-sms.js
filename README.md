# send-sms.js

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Dependency Status][david-image]][david-url]
[![Downloads][downloads-image]][downloads-url]

The library to send simple message which is compatible with multi-services, currently it supports the following services:

- ippanel (www.ippanel.com)
- twilio (www.yuntongxun.com)

## Installation

```sh
$ npm install send-sms --save
```

This library also is able to run at browser-side or any JavaScript environment.

## Usage

```js
const {
  SMS,
  adapters
} = require('send-sms');

const ippanel = new adapters.IPPanel({
  apiKey: 'your api key'
});
const sms = new SMS(ippanel);

// when you need to send a simple message
sms.send('your phone number to send', 'foobar text', 'from tel line');

// sms.send returns a Promise so if you are in ES7 environment
try {
  await sms.send(phone, text);
} catch (err) {
  console.error(err);
}
```

The above example will send a message to user like the following:

```
foobar text
```

## Write your adapter for service that you are using

```js
const { Adapter } = require('send-sms');
class YourServiceAdapter extends Adapter {
  constructor(arguments) {
    super({
      // options like credentials
    });
  }
  send(phone, content, from) {
    // must implement this method in your self adapter, which does
    // send requests to service endpoint, and must return a Promise
  }
}
```

To see an example, see (adapters/smsbao.js)

## License

MIT @ Mobinco, Inc.

[npm-image]: https://img.shields.io/npm/v/send-sms.svg?style=flat-square
[npm-url]: https://npmjs.org/package/send-sms
[travis-image]: https://img.shields.io/travis/mobinco/send-sms.js.svg?style=flat-square
[travis-url]: https://travis-ci.org/mobinco/send-sms.js
[david-image]: http://img.shields.io/david/mobinco/send-sms.js.svg?style=flat-square
[david-url]: https://david-dm.org/mobinco/send-sms.js
[downloads-image]: http://img.shields.io/npm/dm/send-sms.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/send-sms
