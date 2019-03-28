var cheerio = require('cheerio');
var http = require('https');
var iconv = require('iconv-lite')
const request = require('request');
var url = 'https://news.bitcoin.com/';


module.exports.bug = function(req, res) {
	var news = [];
	 
	http.get(url, function(sres) {
		  var chunks = [];
		  sres.on('data', function(chunk) {
		    chunks.push(chunk);
		  });

		  sres.on('end', function() {
		    
		    //由于咱们发现此网页的编码格式为gb2312，所以需要对其进行转码，否则乱码
		    //依据：“<meta http-equiv="Content-Type" content="text/html; charset=gb2312">”
		    var html = iconv.decode(Buffer.concat(chunks), 'utf8');
		    var $ = cheerio.load(html, {decodeEntities: false});
		    $('.td-module-thumb').children('a').each(function (idx, element) {
		      var $element = $(element);
		      news.push({
		        title: $element.attr('title'),
		        url:$element.attr('href')
		      })
		      
		    })
		    request('https://api.bitfinex.com/v2/candles/trade:1M:tBTCUSD/hist?limit=72&start=1364774400000&end=1538352000000&sort=-1', { json: true }, (err, response, body) => {
				if (err) { return console.log(err); }
				
				var avaPrice1 = [0,0,0,0,0,0];
				var avaPrice2 = [0,0,0,0,0,0];
				for (var i=0;i<10;i++)
				{
					avaPrice1[0] += (body[i][1]/10);
				}
				for (var i=10;i<58;i++)
				{
					avaPrice1[parseInt((i+2)/12)] += body[i][1]/12;
				}
				for (var i=58;i<67;i++)
				{
					avaPrice1[5] += body[i][1]/10;
				}
				for (var i=0;i<6;i++)
				{
					avaPrice2[i] = avaPrice1[5-i].toFixed(2);
				}
				
				var isLoged = false;
				if(req.session.userId){
					isLoged = true;
				}
				
				res.render('index.ejs',{
				    news: JSON.stringify(news),
				    avaPrice: JSON.stringify(avaPrice2),
				    isLoged: isLoged,
				    isLoged2: JSON.stringify(isLoged),
			})
			});
		    
		  });
		});

	
}