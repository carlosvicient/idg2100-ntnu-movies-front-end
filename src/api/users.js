import axios from './axios';

const login = (email, password) => {
    console.log('about to do the login...');
    return axios.post('/auth/login', { email, password });
};

export { login };