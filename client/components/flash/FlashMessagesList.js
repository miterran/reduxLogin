import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlashMessage from './FlashMessage';
import { deleteFlashMessage } from '../../actions/flashMessages';

class FlashMessagesList extends React.Component {
	render(){
		let messages = this.props.messages.map(messages => 
			<FlashMessage key={messages.id} message={messages} deleteFlashMessage={this.props.deleteFlashMessage} />
		)
		return (
			<div>
				{messages}
			</div>
		)
	}
}

FlashMessagesList.propTypes = {
	messages: PropTypes.func.isRequired,
	deleteFlashMessage: PropTypes.func.isRequired
};

function mapStateToProps(state){
	return {
		messages: state.flashMessages
	}
}

export default connect(mapStateToProps, { deleteFlashMessage })(FlashMessagesList);