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

  async sendPattern(recipient, patternCode, patternData = {}, from = null) {
    return await this.adapter.sendPattern(recipient, patternCode, patternData, from);
  }
  
  async getDelivery(recId) {
    return await this.adapter.getDelivery(recId);
  }

  async getCredit() {
    return await this.adapter.getCredit(recId);
  }
}

exports.SMS = SMS;
exports.Adapter = Adapter;
exports.adapters = {
  IPPanel: require('./adapters/ippanel.js'),
  ParsGreen: require('./adapters/parsgreen.js'),
  SMSBao: require('./adapters/smsbao.js'),
};
