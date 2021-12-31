import axios from 'axios';
axios.defaults.withCredentials = true;

class HttpClient {
    static async getAuth() {
        const response = await axios.get('/auth', {
            withCredentials: true,
            credentials: 'include',
        });
        return response;
    }

    static async signUp(username, email, password) {
        const response = await axios.post(
            '/users/signup',
            { username, email, password },
            {
                withCredentials: true,
                credentials: 'include',
            }
        );
        return response;
    }

    static async updateDetails(bodyFormData) {
        const response = await axios({
            url: '/users/edit',
            method: 'POST',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true,
            credentials: 'include',
        });
        return response;
    }
}

export default HttpClient;
