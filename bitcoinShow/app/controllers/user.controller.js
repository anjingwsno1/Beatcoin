var User = require("../models/user");
var session = require('express-session')
var crypto = require("crypto");

module.exports.showSignUp = function(req, res) {
		res.render("signup.ejs"); 
}

module.exports.signUp = function(req, res) {
	let md5 = crypto.createHash("md5");
	var result = req.body
	var newUser = User(result);
	var encodepw = md5.update(result.passw).digest("hex");
	newUser.save()
	newUser.passw = encodepw;
	//req.flash('success', 'Registration successfully, go ahead and login.')
	res.redirect('/')
}

module.exports.login = function(req, res) {
	var callback = function(success,data){
		if(success==true){
			User.update(data, function (err, result){
				
				var user = result[0];
				req.session.userId = user._id;
				res.render("profile.ejs",{
					isLoged: true,
					user: user
				});
			})
		} else{
			res.redirect('/')}
	}
	User.check(req.body, callback);
}
	
module.exports.get = function(req, res) {
	if(!req.session.userId){
		res.redirect('/');
	}
	else{
		User.findOne(req.session.userId,function(err, result){
			res.render("profile.ejs",{
				isLoged: true,
				user: result[0] 
			});
		});
	}
}

module.exports.logout = function(req, res) {
	req.session.destroy(function(err) {
		res.redirect('/');  
    });
	
}

module.exports.edit = function(req, res) {
	var result = req.body;
	let md5 = crypto.createHash("md5");
	result.passw = md5.update(result.passw).digest("hex");
	User.edit(req.session.userId, result);
	res.redirect('/profile');
}

//module.exports.logOut = function(req, res) {
//	req.session.if_login = false;
//	res.send(200);
//}
