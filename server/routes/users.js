import express from 'express';
// import bcrypt from 'bcrypt';
//import Validator from 'validator';
// import _ from 'lodash'
import User from '../models/user';
import { createUser, getUserByUserName, getUserById, comparePassword } from '../models/user';
import validateInput from '../shared/validations/signup';
const router = express.Router();

// function validateInput(data){
// 	let errors = {};
// 	if(Validator.isNull(data.username)){
// 		errors.username = 'This field is required';
// 	}
// 	if(Validator.isNull(data.email)){
// 		errors.email = 'This field is required';
// 	}
// 	if(!Validator.isEmail(data.email)){
// 		errors.email = 'Email is invalid';
// 	}
// 	if(Validator.isNull(data.password)){
// 		errors.password = 'This field is required';
// 	}
// 	if(Validator.isNull(data.passwordConfirmation)){
// 		errors.passwordConfirmation = 'This field is required';
// 	}
// 	if(!Validator.equals(data.password, data.passwordConfirmation)){
// 		errors.passwordConfirmation = 'Passwords not match!';
// 	}
// 	if(Validator.isNull(data.timezone)){
// 		errors.timezone = 'This field is required';
// 	}

// 	return {
// 		errors,
// 		isValid: _.isEmpty(errors)
// 	}
// }


router.get('/:identifier', (req, res) => {
	User.find({ $or: [{ username: req.params.identifier }, { email: req.params.identifier }] }).then(function(result){
		if(result.length > 0){
			let user = {};
			user.username = result[0].username;
			user.email = result[0].email;
			res.json(user)
		}else{
			res.send('pass')
		}
	})
})


router.post('/', (req, res) => {
	// setTimeout(() => {
		let { errors, isValid } = validateInput(req.body)
		let { username, email, password, passwordConfirmation, timezone } = req.body
		// let errors = validateInput(req.body).errors;
		// let isValid = validateInput(req.body).isValid
		// console.log(username, email, password, passwordConfirmation, timezone)
		if(isValid){
			User.find({ $or: [{ username: username }, { email: email }] }).then(function(result){
				if(result.length > 0){
					result.map(function(val, idx){
						if(val.username == username){
							errors.username = 'Username already used'
						}
						if(val.email == email){
							errors.email = 'Email already used'
						}
					})
					errors.isValid = false;
					res.json(errors);
				}else{
					let newUser = new User({
						username: username,
						email: email,
						password: password,
						timezone: timezone
					});
					createUser(newUser, function(err, user){
						if(err) throw err;
						res.json({ success: true })
					})
				}
			});
		}else if(errors){
			errors.isValid = false;
			res.json(errors);
		}
	// }, 5000)
	


})

export default router


		// User.createUser(newUser, function(err, user){
		// 	if(err) throw err;
		// 	console.log(user);
		// })

// export function createUser(newUser, callback){
// 	bcrypt.genSalt(10, function(err, salt) {
// 	    bcrypt.hash(newUser.password, salt, function(err, hash) {
// 	        newUser.password = hash;
// 	        newUser.save(callback); 
// 	    });
// 	});
// }

	// app.post('/register', function(req, res){
	// 	let username = req.body.username;
	// 	let email = req.body.email;
	// 	let password = req.body.password;
	// 	let password2 = req.body.password2;

	// 	req.checkBody('username', 'Name is required').notEmpty();
	// 	req.checkBody('email', 'Email is required').notEmpty();
	// 	req.checkBody('email', 'Email is not valid').isEmail();
	// 	req.checkBody('password', 'Password is required').notEmpty();
	// 	req.checkBody('password2', 'Password do not match').equals(password);

	// 	errorReg = req.validationErrors();

	// 	if(errorReg){
	// 		req.flash('alert alert-danger', errorReg);
	// 		res.render('register', {currentUser: res.locals.user,
	// 								title: 'Register'});

	// 	}else{
	// 		let newUser = new User({
	// 			username: username,
	// 			email: email,
	// 			password: password
	// 		});

	// 		User.findOne({username: username, email: email}).then(function(result){
	// 			if(result !== null){
	// 				req.flash('alert alert-danger', 'username or email has already used');
	// 				res.redirect('/register');
	// 			}else{
	// 				var newUser = new User({
	// 					username: username,
	// 					email: email,
	// 					password: password
	// 				});
	// 				newUser.save(function(err, user){
	// 					req.flash('alert alert-success', 'account created, please login now');
	// 					res.redirect('/signin');
	// 				});
	// 			}
	// 		});
	// 	};
	// });