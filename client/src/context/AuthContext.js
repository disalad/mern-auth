import { createContext, useEffect, useContext, useState } from 'react';
// import axios from 'axios';
import HttpClient from '../utils/httpClient';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // axios
        //     .get('/users/login')
        //     .then(result => {
        //         console.log(result.data);
        //         setLoading(false);
        //         setCurrentUser(result.data);
        //     })
        //     .catch(err => {
        //         console.error(err.message);
        //     });
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
        return () => {};
    }, []);

    function createUser(email, password) {
        // return createUserWithEmailAndPassword(auth, email, password);
    }

    function logInUser(email, password) {
        // return signInWithEmailAndPassword(auth, email, password);
    }

    function signOutUser() {
        // return signOut(auth);
    }

    const values = {
        createUser,
        currentUser,
        logInUser,
        signOutUser,
    };

    if (loading) {
        return <>Loading...</>;
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
