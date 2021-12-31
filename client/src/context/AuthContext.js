import { createContext, useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import HttpClient from '../utils/httpClient';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        requestAuth();
    }, []);

    function requestAuth() {
        setLoading(true);
        HttpClient.getAuth()
            .then(result => {
                console.log(result);
                setCurrentUser(result.data);
            })
            .catch(err => {
                console.error(err.message);
                setCurrentUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function createUser(fname, sname, email, password) {
        HttpClient.signUp(fname + ' ' + sname, email, password)
            .then(response => {
                console.log(response);
                requestAuth();
                navigate('/');
            })
            .catch(err => {
                console.error(err.message);
            });
    }

    function logInUser(email, password) {
        HttpClient.logIn(email, password)
            .then(response => {
                console.log(response);
                requestAuth();
                navigate('/');
            })
            .catch(err => {
                console.error(err.message);
            });
    }

    function updateDetails(username, file) {
        const formData = new FormData();
        console.error(file);
        formData.append('dp', file);
        formData.append('username', username);
        HttpClient.updateDetails(formData)
            .then(result => {
                console.log(result);
                requestAuth();
                navigate('/');
            })
            .catch(err => {
                console.error(err.message);
            });
    }

    const values = {
        requestAuth,
        createUser,
        currentUser,
        logInUser,
        updateDetails,
    };

    if (loading) {
        return <>Loading...</>;
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
