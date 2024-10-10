import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Signin } from '../pages/Signin';


const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

const withAuth = (Component) => {
    return (props) => {
        const navigate = useNavigate();
       
        useEffect(() => {
            if (!isAuthenticated()) {
                // navigate('/signin');
                return <Signin />
            }
        }, [navigate]);

        return isAuthenticated() ? <Component {...props} /> : null;

    };
};

export default withAuth;
