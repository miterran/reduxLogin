import React from 'react';
import PropTypes from 'prop-types';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { userSignupRequest, isUserExists } from '../../actions/signupActions';
import { addFlashMessages } from '../../actions/flashMessages';

class SignupPage extends React.Component{
	render(){
		const { userSignupRequest, addFlashMessages, isUserExists }= this.props;
		return(
			<div className='row'>
				<div className="col-sm-4 col-sm-offset-4">
					<SignupForm isUserExists={isUserExists} userSignupRequest={userSignupRequest} addFlashMessages={addFlashMessages} />
				</div>
			</div>
		)
	}
}

SignupPage.propTypes ={
	userSignupRequest: PropTypes.func.isRequired,
	addFlashMessages: PropTypes.func.isRequired,
	isUserExists: PropTypes.func.isRequired
}

//export default connect((state) => { return {} }, { userSignupRequest })(SignupPage);
export default connect(null, { userSignupRequest, addFlashMessages, isUserExists })(SignupPage);
