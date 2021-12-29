import axios from 'axios';
import Storage from './storage';

class HttpClient {
    static async getAuth() {
        const response = await axios.get('/auth', {
            headers: { Authorization: Storage.getToken() },
        });
        return response;
    }

    static async signUp(username, email, password) {
        const response = await axios.post(
            '/users/signup',
            { username, email, password },
            {
                headers: { Authorization: Storage.getToken() },
            }
        );
        return response;
    }

    static async updateDetails(bodyFormData) {
        const response = await axios.post('/users/edit', bodyFormData, {
            headers: { 'Content-Type': 'multipart/form-data', Authorization: Storage.getToken() },
        });
        return response;
    }
}

export default HttpClient;
