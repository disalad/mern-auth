class Storage {
    static getToken() {
        return localStorage.getItem('token');
    }

    static saveToken(token) {
        localStorage.setItem('token', token);
    }
}

export default Storage;
