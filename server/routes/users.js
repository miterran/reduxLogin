import express from 'express';
//import Validator from 'validator';
// import _ from 'lodash'
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

router.post('/', (req, res) => {
	// setTimeout(() => {
		let { errors, isValid } = validateInput(req.body)
		// let errors = validateInput(req.body).errors;
		// let isValid = validateInput(req.body).isValid
		if(isValid){
			res.json({ success: true })
		}else if(errors){
			errors.isValid = false;
			res.json(errors);
		}
	// }, 5000)
	


})

export default router