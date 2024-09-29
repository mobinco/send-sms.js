"use strict";

const BaseAdapter = require('./base.js');
const request = require('superagent-promise')(
  require('superagent'), 
  Promise
);

class SMSBao extends BaseAdapter {
  constructor(credentials) {
    if (!credentials.user) {
      throw new TypeError('credentials.user is required');
    }
    if (!credentials.pass) {
      throw new TypeError('credentials.pass is required');
    }
    super('SMSBao', {
      endpoint: 'http://api.smsbao.com/sms',
      credentials
    });
  }
  
  send(phoneNum, content) {
    return new Promise((resolve, reject) => {
      const response = request.get(this.options.endpoint)
      .query({
        u: this.options.credentials.user,
        p: this.options.credentials.pass,
        m: phoneNum,  // phone number
        c: content    // text content
      })
      .end();

      resolve(response);
    })
  }
}

module.exports = SMSBao;