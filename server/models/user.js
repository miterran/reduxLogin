import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
	username: {
		type: String
	},
	email: {
		type: String
	},
	password: {
		type: String
	},
	timezone: {
		type: String
	}
});


const User = mongoose.model('user', UserSchema);

export default User;

export function createUser(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback); 
	    });
	});
}

export function getUserByUserName(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

export function getUserById(id, callback){
	User.findById(id, callback);
}

export function comparePassword(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch){
	if(err) throw err;
		var isMatch = true;
		callback(null, isMatch);
	})
};


// export function comparePassword(candidatePassword, hash, callback){
// 	if(candidatePassword == hash){
// 		isMatch = true;
// 	}else{
// 		isMatch = false;
// 	}
// 	callback(null, isMatch);
// };

