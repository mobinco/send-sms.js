"use strict";

const BaseAdapter = require('./base');
const axios = require('axios');

class ParsGreen extends BaseAdapter {
  constructor(credentials) {
    if (!credentials.apiKey) {
      throw new TypeError('credentials.apiKey is required');
    }
    super({
      endpoint: 'https://sms.parsgreen.ir/Apiv2',
      credentials
    });
  }

  async send(recipients, content, from) {
    if (!recipients) throw new Error('Recipients is required')
    if (!content) throw new Error('Content is required')
    if (!from) throw new Error('From is required')

    return new Promise((resolve, reject) => {
      try {
        var data = {
          "SmsBody"       : content,
          "SmsNumber"     : from,
          "Mobiles"       : recipients.split(","),
        }

        axios.post(this.options.endpoint + '/Message/SendSms', data, {
          headers : {
            'Authorization' : 'basic apikey:' + this.options.credentials.apiKey,
            'Content-type'  : 'application/json',
          },
          json: true,
        }).then(function (response) {
          const data = response.data;
          const status = response.status;
          if (status === 200) {
            resolve(data)
            return data
          }
        }).catch(function (error) {
          reject(error)
          return new Error(error)
        })
      } catch (error) {
        reject(error)
        return new Error(error)
      }
    })
  }

  async getDelivery(recId) {
    if (!recId) throw new Error('RecId is required')

    return new Promise((resolve, reject) => {
      try {
        var data = {
          "RecId"         : recId
        }

        axios.post(this.options.endpoint + '/Message/CheckDelivery', data, {
          headers : {
            'Authorization' : 'basic apikey:' + this.options.credentials.apiKey,
            'Content-type'  : 'application/json',
          },
          json: true,
        }).then(function (response) {
          const data = response.data;
          const status = response.status;
          if (status === 200) {
            resolve(data)
            return data
          }
        }).catch(function (error) {
          reject(error)
          return new Error(error)
        })
      } catch (error) {
        reject(error)
        return new Error(error)
      }
    })
  }

  async getCredit() {
    return new Promise((resolve, reject) => {
      try {
        var data = {}

        axios.post(this.options.endpoint + '/User/Credit', data, {
          headers : {
            'Authorization' : 'basic apikey:' + this.options.credentials.apiKey,
            'Content-type'  : 'application/json',
          },
          json: true,
        }).then(function (response) {
          const data = response.data;
          const status = response.status;
          if (status === 200) {
            resolve(data)
            return data
          }
        }).catch(function (error) {
          reject(error)
          return new Error(error)
        })
      } catch (error) {
        reject(error)
        return new Error(error)
      }
    })
  }

}

module.exports = ParsGreen;
