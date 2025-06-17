"use strict"
const { SMS, adapters } = require('./index');

const parsgreen = new SMS(new adapters.ParsGreen({
  apiKey: 'Your Api key',
}));

parsgreen.send('09100000000', 'سلام', '10004004040').then((res) => {
  console.log(res);

  if (res.SuccessCount > 0) {
    parsgreen.getDelivery(res.DataList[0]?.ReqID).then((res) => {
      console.log(res);
    });
  }
});
