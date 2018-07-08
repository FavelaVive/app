import { API } from './constants';
import { AsyncStorage } from 'react-native';

export const getApi = async (url) => {
	return fetch(API + url, {
	    method: 'GET',
	    headers: {
	    	'Accept': 'application/json'
	    }
	}).then(response => response.json());
}

export const post = async (url, data) => {
	return fetch(API + url, {
        method: 'POST',
        body: JSON.stringify(data),
	    headers: {
	    	'Accept': 'application/json'
	    }
	}).then(response => response.json());
}