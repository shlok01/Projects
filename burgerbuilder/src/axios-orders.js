import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-cb113.firebaseio.com/'
});

export default instance;