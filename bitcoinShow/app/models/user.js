/* Connect to users collection */
var mongoose = require('mongoose');
var Schema = mongoose.Schema
const crypto = require("crypto");


var UserSchema = new Schema(
		{realname: String,
		 accountname: String,
		 email: String,
		 telephone: String,
		 passw: String}
);


var User = mongoose.model('users', UserSchema);


module.exports = User;

module.exports.check = function(data, callback) {
	let md5 = crypto.createHash("md5");
	data.passw = md5.update(data.passw).digest("hex");
	User.find({"accountname": data.accountnameEmail, "passw": data.passw}).count().exec(
			function(err, result) {
				if (result == 1) {
					callback(true,data.accountnameEmail);
				} else { 
					User.find({"email": data.accountnameEmail, "passw": data.passw}).count().exec(
							function(err, result) {
								if (result == 1) {
									callback(true,data.accountnameEmail);
								} else { 
									callback(false,data.accountnameEmail);
								}
						});
				}
		});


}

module.exports.update = function(user, cb){
	User.find({"accountname": user}).count().exec(
			function(err, result){
				if(result!=0){return User.find({"accountname": user}).exec(cb);}
				else{return User.find({"email": user}).exec(cb);}
			})
}

module.exports.edit = function(id, data){
	var newvalues = { $set: { realname: data.realname,
						      accountname: data.accountname,
						      email: data.email,
						      telephone: data.telephone,
						      passw: data.passw
	      } }
	User.updateOne({"_id": id},newvalues,function(err, res) {
	    if (err) throw err;
	  });
	
}

module.exports.findOne = function(id, cb){
	return User.find({"_id": id}).exec(cb);
}
