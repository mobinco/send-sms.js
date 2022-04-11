"use strict";

const BaseAdapter = require('send-sms/adapters/base');
const request = require('request');

class IPPanel extends BaseAdapter {
  constructor(credentials) {
    if (!credentials.apiKey) {
      throw new TypeError('credentials.apiKey is required');
    }
    super({
      endpoint: 'http://rest.ippanel.com/v1',
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
          "message"       : content,
          "originator"    : from,
          "recipients"    : recipients.split(","),
        }
        //Parse Pattern
        data = this.parsePattern(data);
        const pattern = (data['pattern_code'] ? '/patterns/send' : '');

        request.post({
          url: this.options.endpoint + '/messages' + pattern,
          body: data,
          headers : {
            'Authorization' : 'AccessKey ' + this.options.credentials.apiKey,
            'Content-type'  : 'application/json',
          },
          json: true,
        }, function (error, response, body) {
          if (!error && response.statusCode === 200) {
            resolve(response.body);
            return response.body
          } else {
            reject(error)
            return new Error(error)
          }
        })
      } catch (error) {
        reject(error)
        return new Error(error)
      }
    })
  }

  parsePattern (data) {
    try {
      const message = data['message'] || '';
      if (message.substr(0, 4).toLowerCase() != "pid=") {
        return data;
      }

      var arrRet = {};
      //Split New Line
      const arrLine = message.split(/\r\n|\n|\r/);
      arrLine.forEach(function(line, index) {
        //Split by =, :
        const arrPrm = line.split(/=/);
        if (arrPrm.length == 2) {
          arrRet[arrPrm[0].trim()] = arrPrm[1];
        }
      })

      if (Object.keys(arrRet).length > 0) {
        data['pattern_code'] = arrRet['pid'];
        data['recipient'] = data['recipients'][0] || '';

        delete data['message'];
        delete data['recipients'];
        delete arrRet['pid'];
        data['values'] = arrRet;
      }
      
      return data;

    } catch (error) {
      throw new Error(error)
    }
  }

}

module.exports = IPPanel;
