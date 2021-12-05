import axios from 'axios'

const api = axios.create({
    baseURL: 'http://52.2.124.217:8080/',
});

export default api