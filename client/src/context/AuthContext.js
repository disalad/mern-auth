import { createContext, useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import HttpClient from '../utils/httpClient';
import Storage from '../utils/storage';

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
        return () => {};
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
                return Storage.saveToken(response.data.accessToken);
            })
            .then(() => {
                console.log('SAVED');
                requestAuth();
                navigate('/');
            })
            .catch(err => {
                console.error(err.message);
            });
    }

    function logInUser(email, password) {
        // return signInWithEmailAndPassword(auth, email, password);
    }

    function updateDetails(username, file) {
        console.log(currentUser.user.email);
        const formData = new FormData();
        console.error(file);
        formData.append('dp', file);
        formData.append('username', username);
        console.warn(formData);
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
