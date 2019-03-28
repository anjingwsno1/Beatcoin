/* Connect to users collection */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TradeSchema = new Schema(
		{
		coin: [],
		price: [],
		market_cap: [],
		volume: [],
		change: [],
		}
		
		
);

var Trade = mongoose.model('trades', TradeSchema);

module.exports = Trade;

module.exports.socket = function(){
	return trade.find({coin:coin}).count();
	
}
module.exports.findOne = function(coin){
	return trade.find({coin:coin}).count();
	
}

module.exports.newTrade = function(coin,price,mktc,volume,change){
	trade.save({coin: coin, price: price, market_cap: mktc, volume: volume, change: change});
}
