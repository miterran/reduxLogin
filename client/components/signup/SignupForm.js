import React from 'react';
import { Route, Redirect } from 'react-router'
import PropTypes from 'prop-types';
import timezones from '../../data/timezones';
import classnames from 'classnames';
import _ from 'lodash';
import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';


class SignupForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			passwordConfirmation: '',
			timezone: '',
			errors: {},
			pass: {},
			isLoading: false,
			success: false,
			invalid: false
		}
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
		this.checkUserExists = this.checkUserExists.bind(this)
	}
	onChange(e){
		this.setState({ [e.target.name]: e.target.value})
	}
	isValid(){
		// let errors = validateInput(this.state).errors;
		// let isValid = validateInput(this.state).isValid
		const { errors, isValid } = validateInput(this.state);
		if(!isValid){
			this.setState({ errors })
		}
		return isValid;
	}
	checkUserExists(e){
		const field = e.target.name;
		const val = e.target.value;
		if(val !== ""){
			this.props.isUserExists(val).then(function(response){
				let errors = this.state.errors;
				let pass = this.state.pass;
				let invalid = this.state.invalid;;
				if(response.data !== 'pass'){
					errors[field] = "There is user with this " + field;
					invalid = true;
				}else{
					errors[field] = ''
					invalid = false
				}
				// else if(response.data == 'pass'){
				// 	pass[field] = 'This ' + field +  ' looks good!';
				// }
				this.setState({ pass })
				this.setState({ errors, invalid })
			}.bind(this))
		}

	}
	onSubmit(e){
		e.preventDefault();
		if(this.isValid()){
			this.setState({ errors: {}, isLoading: true })
			// axios.post('/api/users', {user: this.state});
			// console.log(this.state)
			this.props.userSignupRequest(this.state).then(function(response){

				if(!response.data.isValid){
					this.setState({ errors: response.data, isLoading: false })
				}
				if(response.data.success == true){
					this.props.addFlashMessages({
						type: 'success', text: 'Welcome! You Signed Up Successfully!'
					})
					this.setState({ success: true })
				}
			}.bind(this)).catch(function(error){
				throw error
			})
		}
	}
	render(){
		const options = _.map(timezones, (val, key) =>{ 
			return <option value={val} key={val}>{key}</option>
		})
	    if(this.state.success){
	      return <Redirect to='/'/>;
	    }
		return(
			<form onSubmit={this.onSubmit}>
				<h1>Join Our community!</h1>

				<TextFieldGroup 
					error={this.state.errors.username}
					label="Username"
					onChange={this.onChange}
					checkUserExists={this.checkUserExists}
					value={this.state.username}
					field='username'
					type='text'
				/>
				<TextFieldGroup 
					error={this.state.errors.email}
					label="Email"
					onChange={this.onChange}
					checkUserExists={this.checkUserExists}
					value={this.state.email}
					field='email'
					type='text'
				/>
				<TextFieldGroup 
					error={this.state.errors.password}
					label="Password"
					onChange={this.onChange}
					value={this.state.password}
					field='password'
					type='password'
				/>
				<TextFieldGroup 
					error={this.state.errors.passwordConfirmation}
					label="Password Confirmation"
					onChange={this.onChange}
					value={this.state.passwordConfirmation}
					field='passwordConfirmation'
					type='password'
				/>

				<div className={classnames('form-group', {'has-error': this.state.errors.timezone})}>
					<label className="control-label">Timezone: </label>
					<select className='form-control' name='timezone' onChange={this.onChange} value={this.state.timezone}>
						<option value="" disabled>Choose Your Timezone</option>
						{options}
					</select>
					{this.state.errors.timezone && <span className='help-block'>{this.state.errors.timezone}</span>}
				</div>
				<div className='form-group'>
					<button disabled={this.state.isLoading || this.state.invalid } className='btn btn-primary'>Sign Up</button>
				</div>
			</form>
		)
	}
}

SignupForm.propTypes = {
	userSignupRequest: PropTypes.func.isRequired,
	addFlashMessages: PropTypes.func.isRequired,
	isUserExists: PropTypes.func.isRequired
};

export default SignupForm;


// class MyComponent extends React.Component {
//   render() {
//     // This must be exactly one element or it will warn.
//     const children = this.props.children;
//     return (
//       <div>
//         {children}
//       </div>
//     );
//   }
// }

// MyComponent.propTypes = {
//   children: PropTypes.element.isRequired
// };



// <div className={classnames('form-group', {'has-error': this.state.errors.username})}>
// 	<label className="control-label">Username: </label>
// 	<input value={this.state.username} onChange={this.onChange} type='text' name='username' className='form-control' />
// 	{this.state.errors.username && <span className='help-block'>{this.state.errors.username}</span>}
// </div>
// <div className={classnames('form-group', {'has-error': this.state.errors.email})}>
// 	<label className="control-label">Email: </label>
// 	<input value={this.state.email} onChange={this.onChange} type='text' name='email' className='form-control' />
// 	{this.state.errors.email && <span className='help-block'>{this.state.errors.email}</span>}
// </div>
// <div className={classnames('form-group', {'has-error': this.state.errors.password})}>
// 	<label className="control-label">Password: </label>
// 	<input value={this.state.password} onChange={this.onChange} type='password' name='password' className='form-control' />
// 	{this.state.errors.password && <span className='help-block'>{this.state.errors.password}</span>}
// </div>
// <div className={classnames('form-group', {'has-error': this.state.errors.passwordConfirmation})}>
// 	<label className="control-label">Password Confirmation: </label>
// 	<input value={this.state.passwordConfirmation} onChange={this.onChange} type='password' name='passwordConfirmation' className='form-control' />
// 	{this.state.errors.passwordConfirmation && <span className='help-block'>{this.state.errors.passwordConfirmation}</span>}
// </div>









