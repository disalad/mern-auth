import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import AuthContextProvider from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import EditProfile from './pages/EditProfile';

function App() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Routes>
                    <Route path='/login' element={<PublicRoute />}>
                        <Route index element={<LogIn />} />
                    </Route>
                    <Route path='/signup' element={<PublicRoute />}>
                        <Route index element={<SignUp />} />
                    </Route>
                    <Route path='/' element={<PrivateRoute />}>
                        <Route index element={<Dashboard />} />
                    </Route>
                    <Route path='/settings/profile' element={<PrivateRoute />}>
                        <Route index element={<EditProfile />} />
                    </Route>
                </Routes>
            </AuthContextProvider>
        </BrowserRouter>
    );
}

export default App;
