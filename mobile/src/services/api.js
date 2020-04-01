import axios from 'axios';

const api = axios.create({
    // Localhost
    //baseURL: 'http://192.168.100.2:3333'  
    
    //API Online
    baseURL: 'https://alissonapi.herokuapp.com'
});

export default api;