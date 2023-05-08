const ccxt = require('ccxt');
const axios = require('axios');


const tick = async(config,binanceClient) =>{
    const {asset, base, spread, allocation} = config;
    console.log(config);
    const market = `${asset}/${base}`;
    const orders =await binanceClient.fetchOpenOrders(market);
    orders.forEach(async order  => {
      await binanceClient.cancelOrder(order.id);
    });
  
    const results = await Promise.all([
      axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'),
      axios.get('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd')
  
    ])
  
    const marketPrice = results[0].data.bitcoin.usd/results[1].data.tether.usd;
    const sellPrice = marketPrice * (1 + spread);
    const buyPrice = marketPrice * (1 - spread);
    const balances = await binanceClient.fetchBalance();
    const assetBalance = balances.free[asset];
    const baseBalance = balances.free[base];
    const sellVolume = assetBalance * allocation;
    const buyVolume = (baseBalance * allocation)/ marketPrice;
  
  await binanceClient.createLimitSellOrder(market,sellVolume,sellPrice);
  await binanceClient.createLimitBuyOrder(market,buyVolume,buyPrice);
  
  }
  class Controller {
    async buySell(req, res, next) {
      try {
        const config = {
            asset: 'BTC',
            base: 'USDT',
            allocation: 0.1,
            spread: 0.2,
            tickInterval: 2000
          };
          const binanceClient = new ccxt.binance({
            apiKey: process.env.API_ENV,
            secret: process.env.API_SECRET,
          });
          tick(config,binanceClient);
          setInterval(tick, config.tickInterval, config, binanceClient);
        res.status(200).json({ message: 'Order Placed successfully' });
      } catch (error) {
        next(error);
      }
    }
  
  }
  module.exports = new Controller();
  
