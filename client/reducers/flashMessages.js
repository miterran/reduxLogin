import { ADD_FLASH_MESSAGES, DELETE_FLASH_MESSAGES } from '../actions/types';
import _ from 'lodash';
import shortid from 'shortid';

export default (state=[], action={}) => {
	switch(action.type){
		case ADD_FLASH_MESSAGES: {
			return [...state, { id: shortid.generate(), type: action.message.type, text: action.message.text }]
		}
		case DELETE_FLASH_MESSAGES: {
			let index = _.findIndex(state, { id: action.id });
			if(index >= 0){
				return [...state.slice(0, index), ...state.slice(index + 1)]
			}
		}
		default: 
			return state;
	}
	return state;
}