import axios from 'axios';

const HOST_API = 'http://localhost:8080';
const SERVICE_API = `${HOST_API}`;

class LoginService {
    getLogin(loginData) {
        return axios.post(`${SERVICE_API}/login`, loginData);
    }
}

export default new LoginService();