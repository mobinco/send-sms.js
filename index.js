"use strict";

const Adapter = require('./adapters/base');

class SMS {
  constructor(adapter) {
    if (!(adapter instanceof Adapter)) {
      throw new TypeError('adapter must be an instance of Adapter');
    }
    this.adapter = adapter;
  }

  async send(recipients, content, from = null) {
    return await this.adapter.send(recipients, content, from);
  }

  async sendPattern(recipient, patternCode, patternData = null, from = null) {
    return await this.adapter.sendPattern(recipient, patternCode, patternData, from);
  }
}

exports.SMS = SMS;
exports.Adapter = Adapter;
exports.adapters = {
  IPPanel: require('./adapters/ippanel.js'),
  SMSBao: require('./adapters/smsbao.js'),
};
