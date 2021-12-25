import axios from 'axios';

class HttpClient {
    static async getAuth() {
        const token = localStorage.getItem('token');
        const response = await axios.get('/auth', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response;
    }

    // static async signUp(fname, sname, email, password) {}
}

export default HttpClient;
