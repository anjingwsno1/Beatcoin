var History = require("../models/history");
const request = require('request');

module.exports.predict = function(req, res){
	//prediction
	var btcResult=0;
	var ethResult=0;
	var xrpResult=0;
	var bchResult=0;
	var prediction = function (coin, cb){
		var coinPrediction = [0,0,0,0,0,0];
		History.findByCoin(coin, function(err, result){
			var resultOld = result;
			var base = result[0][1];
			coinPrediction[0] = parseFloat(base);

			result.sort(function(a, b){return b[1] - a[1]});
			function checkBase(p) {
			    return p[1] == base;
			}

			var middle = result.findIndex(checkBase);
			var count = [0,0,0,0,0,0];
			for(var i=middle-5;(i<middle+6)&&(i<365);i++){

				for(var j=1;j<6;j++){
					function checkPrice(a) {
			
					    return a[0] == parseInt(result[i][0])+86400000*j;
					    
					}
					
					if((i!=middle)&&(result.findIndex(checkPrice)!=-1)){
						coinPrediction[j] +=parseFloat(result[result.findIndex(checkPrice)][1]);
						count[j]++;
						
					}
				}

				
			}
			for(var i=1;i<6;i++){
				
				coinPrediction[i] = (coinPrediction[i]/count[i]).toFixed(2);
			}
			
			cb(coinPrediction);
		})
		
	}
	prediction('btc', function(price1){
		btcResult = price1;
		prediction('eth', function(price2){
			ethResult = price2;
			prediction('xrp', function(price3){
				xrpResult = price3;
				prediction('bch', function(price4){
					bchResult = price4;
					res.render('prediction.ejs',{
						btcPrediction: JSON.stringify(btcResult),
						ethPrediction: JSON.stringify(ethResult),
						xrpPrediction: JSON.stringify(xrpResult),
						bchPrediction: JSON.stringify(bchResult),
						isLoged: true,

					});
				});
			});
		});
	});
	
	
}

module.exports.update = function(req, res) {
	var btcTime = [];
	var btcPrice = [];
	var btcDayPrice = [];
	var ethTime = [];
	var ethPrice = [];
	var ethDayPrice = [];
	var xrpTime = [];
	var xrpPrice = [];
	var xrpDayPrice = [];
	var bchTime = [];
	var bchPrice = [];
	var bchDayPrice = [];

	
	History.sortByCoin('btc',function(err,result){
		for (var i=29;i>=0;i--){
			btcDayPrice.push(parseFloat(result[i][1]).toFixed(2));
		}
		
		for (var i=result.length-1;i>=0;i--){
			btcTime.push(parseFloat(result[i][0]));
			btcPrice.push([parseFloat(result[i][1]),parseFloat(result[i][2]),parseFloat(result[i][4]),parseFloat(result[i][3])]);
		}
		History.sortByCoin('eth',function(err1,result1){
			for (var i=29;i>=0;i--){
				ethDayPrice.push(parseFloat(result1[i][1]).toFixed(2));
			}
			
			for (var i=result1.length-1;i>=0;i--){
				ethTime.push(parseFloat(result1[i][0]));
				ethPrice.push([parseFloat(result1[i][1]),parseFloat(result1[i][2]),parseFloat(result1[i][4]),parseFloat(result1[i][3])]);
			}
			History.sortByCoin('xrp',function(err2,result2){
				for (var i=29;i>=0;i--){
					xrpDayPrice.push(parseFloat(result2[i][1]).toFixed(2));
				}
				
				for (var i=result2.length-1;i>=0;i--){
					xrpTime.push(parseFloat(result2[i][0]));
					xrpPrice.push([parseFloat(result2[i][1]),parseFloat(result2[i][2]),parseFloat(result2[i][4]),parseFloat(result2[i][3])]);
				}
				History.sortByCoin('bch',function(err3,result3){
					for (var i=29;i>=0;i--){
						bchDayPrice.push(parseFloat(result3[i][1]).toFixed(2));
					}
					
					for (var i=result3.length-1;i>=0;i--){
						bchTime.push(parseFloat(result3[i][0]));
						bchPrice.push([parseFloat(result3[i][1]),parseFloat(result3[i][2]),parseFloat(result3[i][4]),parseFloat(result3[i][3])]);
					}
					var priceNow = [];
					
					priceNow[0] = (btcPrice[btcPrice.length-1][0]).toFixed(2);
					priceNow[1] = ethPrice[ethPrice.length-1][0].toFixed(2);
					priceNow[2] = xrpPrice[xrpPrice.length-1][0].toFixed(2);
					priceNow[3] = bchPrice[bchPrice.length-1][0].toFixed(2);
					
					function unixtodate(unix){
						var d = new Date(parseInt(unix));
					    var year = d.getFullYear();
					    var month = d.getMonth()+1;
					    var day = d.getDate();
					    var hour= d.getHours();
					    var min = d.getMinutes();
					    var n = year+"/"+month+"/"+day+"   "+hour+":"+min;
					    console.log(unix,d);
					    return n;
					    
					}
					BtcTime = btcTime.map(unixtodate);
					EthTime = ethTime.map(unixtodate);
					XrpTime = xrpTime.map(unixtodate);
					BchTime = bchTime.map(unixtodate);
					var isLoged = false;
					if(req.session.userId){
						isLoged = true;
					}

					res.render('history.ejs',{
						btcTime: JSON.stringify(BtcTime),
						btcPrice: JSON.stringify(btcPrice),
						btcDayPrice: JSON.stringify(btcDayPrice),
						ethTime: JSON.stringify(EthTime),
						ethPrice: JSON.stringify(ethPrice),
						ethDayPrice: JSON.stringify(ethDayPrice),
						xrpTime: JSON.stringify(XrpTime),
						xrpPrice: JSON.stringify(xrpPrice),
						xrpDayPrice: JSON.stringify(xrpDayPrice),
						bchTime: JSON.stringify(BchTime),
						bchPrice: JSON.stringify(bchPrice),
						bchDayPrice: JSON.stringify(bchDayPrice),
						priceNow: priceNow,
						isLoged: isLoged,

					});
					
					History.remove(function(err, obj) {
					    if (err) throw err;
						request('https://api.bitfinex.com/v2/candles/trade:1D:tBTCUSD/hist?limit=365&sort=-1', { json: true }, (err, response, body) => {
							if (err) { return console.log(err); }
							for(var i=0;i<body.length;i++){
								var newHistory = History(body[i]);
								newHistory[5] = "btc";
								newHistory.save();
							}
							request('https://api.bitfinex.com/v2/candles/trade:1D:tETHUSD/hist?limit=365&sort=-1', { json: true }, (err, response, body2) => {
								for(var i=0;i<body2.length;i++){
									var newHistory = History(body2[i]);
									newHistory[5] = "eth";
									newHistory.save();					
								}
								request('https://api.bitfinex.com/v2/candles/trade:1D:tXRPUSD/hist?limit=365&sort=-1', { json: true }, (err, response, body3) => {
									for(var i=0;i<body3.length;i++){
										var newHistory = History(body3[i]);
										newHistory[5] = "xrp";
										newHistory.save();					
									}
									request('https://api.bitfinex.com/v2/candles/trade:1D:tBCHUSD/hist?limit=365&sort=-1', { json: true }, (err, response, body4) => {
										for(var i=0;i<body4.length;i++){
											var newHistory = History(body4[i]);
											newHistory[5] = "bch";
											newHistory.save();					
										}
									})
								})	
							})
						})
					  });
					
				})
				
			})
			
		})
		
	})


}