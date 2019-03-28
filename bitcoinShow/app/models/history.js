/* Connect to users collection */
var mongoose = require('mongoose');
var Schema = mongoose.Schema



var HistorySchema = new Schema(
		{0: [],
		1: [],
		2: [],
		3: [],
		4: [],
		5: []}
);

var History = mongoose.model('historys', HistorySchema);

module.exports = History;

module.exports.findByCoin = function(coin,cb){
	return History.find({"5": coin}).exec(cb);
}

module.exports.sortByCoin = function(coin,cb){
	return History.find({"5": coin}).sort({"0":-1}).exec(cb);
	
}

module.exports.remove = function(cb){
	History.deleteMany({}, cb);

}

module.exports.findAll = function(cb){
	return History.find({}).exec(cb);

}
