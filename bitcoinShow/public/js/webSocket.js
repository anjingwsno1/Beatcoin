var socket = io.connect('https://coincap.io');
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();

sound = function(fre){
	var frequency = fre;
	var soundcontrol;
    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    if (fre>=0){oscillator.type = 'sine';}
    else oscillator.type = 'square';
    oscillator.frequency.value = frequency;
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01);
    oscillator.start(audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);
    oscillator.stop(audioCtx.currentTime + 1);}


socket.on('trades', function (tradeMsg) {
	var changePrice = tradeMsg.msg.price.toFixed(2);
	var changeMarketCap = (tradeMsg.msg.mktcap/1000000000).toFixed(2);
	var changeVolume = (tradeMsg.msg.volume/1000000).toFixed(2);
	var changeChange = tradeMsg.msg.cap24hrChange.toFixed(2);
//	try{window.location = "/currencydata";
//	}
//	catch(err){alert(err);}
	if(tradeMsg.coin=="BTC"){
	document.getElementById('btcPrice').innerHTML = "$"+changePrice;
	document.getElementById('btcMarketCap').innerHTML = "$"+changeMarketCap+"b";
	document.getElementById('btcVolume').innerHTML = "$"+changeVolume+"m";
	document.getElementById('btcChange').innerHTML = changeChange+"%";
	
		if (changeChange < 0){
			soundcontrol = 196;
			document.getElementById('btc').style.backgroundColor = "#7FFFAA";
		}else if (changeChange > 0){
			soundcontrol = 880;
			document.getElementById('btc').style.backgroundColor = "#FFC0CB";
		}
	sound(soundcontrol);
	setTimeout(function(){document.getElementById('btc').style.backgroundColor = "white";}, 300);
		
		}
	
	else if(tradeMsg.coin=="ETH"){
		document.getElementById('ethPrice').innerHTML = "$"+changePrice;
		document.getElementById('ethMarketCap').innerHTML = "$"+changeMarketCap+"b";
		document.getElementById('ethVolume').innerHTML = "$"+changeVolume+"m";
		document.getElementById('ethChange').innerHTML = changeChange+"%";
		if (changeChange < 0){
			soundcontrol = 196;
			document.getElementById('eth').style.backgroundColor = "#7FFFAA";
			
		}else if (changeChange > 0){
			soundcontrol = 880;
			document.getElementById('eth').style.backgroundColor = "#FFC0CB";
		}
		sound(soundcontrol);
		setTimeout(function(){document.getElementById('eth').style.backgroundColor = "white";}, 300);
		}
	
	else if(tradeMsg.coin=="XRP"){
		document.getElementById('xrpPrice').innerHTML = "$"+changePrice;
		document.getElementById('xrpMarketCap').innerHTML = "$"+changeMarketCap+"b";
		document.getElementById('xrpVolume').innerHTML = "$"+changeVolume+"m";
		document.getElementById('xrpChange').innerHTML = changeChange+"%";
		if (changeChange < 0){
			soundcontrol = 196;
			document.getElementById('xrp').style.backgroundColor = "#7FFFAA";
		}else if (changeChange > 0){
			soundcontrol = 880;
			document.getElementById('xrp').style.backgroundColor = "#FFC0CB";
		}
		sound(soundcontrol);
		setTimeout(function(){document.getElementById('xrp').style.backgroundColor = "white";}, 300);
		}
	
	else if(tradeMsg.coin=="BCH"){
		document.getElementById('bchPrice').innerHTML = "$"+changePrice;
		document.getElementById('bchMarketCap').innerHTML = "$"+changeMarketCap+"b";
		document.getElementById('bchVolume').innerHTML = "$"+changeVolume+"m";
		document.getElementById('bchChange').innerHTML = changeChange+"%";
		
		if (changeChange < 0){
			soundcontrol = 196;
			document.getElementById('bch').style.backgroundColor = "#7FFFAA";
		}else if (changeChange > 0){
			soundcontrol = 880;
			document.getElementById('bch').style.backgroundColor = "#FFC0CB";
		}
		sound(soundcontrol);
		setTimeout(function(){document.getElementById('bch').style.backgroundColor = "white";}, 300);
		}
	
	else if(tradeMsg.coin=="XLM"){
		document.getElementById('xlmPrice').innerHTML = "$"+changePrice;
		document.getElementById('xlmMarketCap').innerHTML = "$"+changeMarketCap+"b";
		document.getElementById('xlmVolume').innerHTML = "$"+changeVolume+"m";
		document.getElementById('xlmChange').innerHTML = changeChange+"%";
		
		if (changeChange < 0){
			soundcontrol = 196;
			document.getElementById('xlm').style.backgroundColor = "#7FFFAA";
		}else if (changeChange > 0){
			soundcontrol = 880;
			document.getElementById('xlm').style.backgroundColor = "#FFC0CB";
		}
		sound(soundcontrol);
		setTimeout(function(){document.getElementById('xlm').style.backgroundColor = "white";}, 300);
		}
	
	else if(tradeMsg.coin=="USDT"){
		document.getElementById('usdtPrice').innerHTML = "$"+changePrice;
		document.getElementById('usdtMarketCap').innerHTML = "$"+changeMarketCap+"b";
		document.getElementById('usdtVolume').innerHTML = "$"+changeVolume+"m";
		document.getElementById('usdtChange').innerHTML = changeChange+"%";
		
		if (changeChange < 0){
			soundcontrol = 196;
			document.getElementById('usdt').style.backgroundColor = "#7FFFAA";
		}else if (changeChange > 0){
			soundcontrol = 880;
			document.getElementById('usdt').style.backgroundColor = "#FFC0CB";
		}
		sound(soundcontrol);
		setTimeout(function(){document.getElementById('usdt').style.backgroundColor = "white";}, 300);
		}
	
	else if(tradeMsg.coin=="LTC"){
		document.getElementById('ltcPrice').innerHTML = "$"+changePrice;
		document.getElementById('ltcMarketCap').innerHTML = "$"+changeMarketCap+"b";
		document.getElementById('ltcVolume').innerHTML = "$"+changeVolume+"m";
		document.getElementById('ltcChange').innerHTML = changeChange+"%";
		
		if (changeChange < 0){
			soundcontrol = 196;
			document.getElementById('ltc').style.backgroundColor = "#7FFFAA";
		}else if (changeChange > 0){
			soundcontrol = 880;
			document.getElementById('ltc').style.backgroundColor = "#FFC0CB";
		}
		sound(soundcontrol);
		setTimeout(function(){document.getElementById('ltc').style.backgroundColor = "white";}, 300);
		}
	
	else if(tradeMsg.coin=="EOS"){
		document.getElementById('eosPrice').innerHTML = "$"+changePrice;
		document.getElementById('eosMarketCap').innerHTML = "$"+changeMarketCap+"b";
		document.getElementById('eosVolume').innerHTML = "$"+changeVolume+"m";
		document.getElementById('eosChange').innerHTML = changeChange+"%";
		
		if (changeChange < 0){
			soundcontrol = 196;
			document.getElementById('eos').style.backgroundColor = "#7FFFAA";
		}else if (changeChange > 0){
			soundcontrol = 880;
			document.getElementById('eos').style.backgroundColor = "#FFC0CB";
		}
		sound(soundcontrol);
		setTimeout(function(){document.getElementById('eos').style.backgroundColor = "white";}, 300);
		}
})