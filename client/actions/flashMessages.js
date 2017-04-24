import { ADD_FLASH_MESSAGES, DELETE_FLASH_MESSAGES } from './types';

export function addFlashMessages(message){
	return {
		type: ADD_FLASH_MESSAGES, message
	}
}

export function deleteFlashMessage(id){
	return {
		type: DELETE_FLASH_MESSAGES, id
	}
}