import axios from 'axios';

const instance = axios.create({ validateStatus: () => true, withCredentials: true });

export default instance;
