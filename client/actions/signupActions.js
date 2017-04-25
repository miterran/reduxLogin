import axios from 'axios';

export function userSignupRequest(userData){
	return dispatch => {
		return axios.post('/api/users', userData)
	}
}

export function isUserExists(identifier){
	console.log(identifier)
	return dispatch => {
		return axios.get('/api/users/' + identifier)
	}
}