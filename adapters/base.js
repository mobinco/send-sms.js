"use strict";

class Adapter {
  constructor(options) {
    this.options = options;
  }

  async send() {
    throw new Error('not implemented');
  }
  
  async sendPattern() {
    throw new Error('not implemented');
  }
  
  async getDelivery() {
    throw new Error('not implemented');
  }
  
  async getCredit() {
    throw new Error('not implemented');
  }
  
}

module.exports = Adapter;
