const request = require('request');
var Trade = require("../models/trade");



module.exports.initial = function(req, res) {
	var price=[];
	var marketCap=[];
	var volume=[];
	var change=[];
	
	
	request('http://coincap.io/front', { json: true }, (err, response, body) => {
		if (err) { return console.log(err); }
		for (var i=0;i<8;i++)
		{
		price[i] = body[i].price.toFixed(2);
		marketCap[i] = (body[i].mktcap/1000000000).toFixed(2);
		volume[i] = (body[i].volume/1000000).toFixed(2);
		change[i] = body[i].cap24hrChange.toFixed(2);
		}
		var isLoged = false;
		if(req.session.userId){
			isLoged = true;
		}
		res.render("currency.ejs",{
			
			price: price,
			marketCap: marketCap,
			volume: volume,
			change: change,
			isLoged: isLoged,

		});
		});

	
}

module.exports.update = function(req, res) {
	console.log(req);
}