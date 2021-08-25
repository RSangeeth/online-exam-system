var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	
	unique_id: Number,
	email: String,
	username: String,
	year: String,
	dept: String,
	place: String,
	mobnum: String,
	dateofj: String,
	dateofb: String,
	password: String,
	passwordConf: String
}),
User = mongoose.model('accounts', userSchema);

module.exports = User;