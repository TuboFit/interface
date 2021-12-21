import axios from 'axios';

const api = axios.create({
    baseURL: 'https://turbofit-api.herokuapp.com'
})

export default api;