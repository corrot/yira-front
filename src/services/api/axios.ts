import axios from 'axios';

const baseURL = process.env.API_BASE_URL;
const authToken = String(process.env.AUTH_TOKEN);

const instance = axios.create({ baseURL });

export const setAuthHeader = (token: string) => {
	console.log(token);
	instance.defaults.headers[authToken] = token; // set on login success action
};

export const deleteAuthHeader = () => {
	delete instance.defaults.headers[authToken]; // remove on logout action
};

export const { get, post, put, delete: del } = instance;

export default instance;
