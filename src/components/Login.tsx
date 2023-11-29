import React, { useState } from 'react';
import LoginForm from './LoginForm';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../firebaseConfig';

// firebase setup
const app = firebaseApp;
const auth = getAuth(app);

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError(null); // Clear error when email is changed
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setError(null); // Clear error when password is changed
    };

    const validateForm = () => {
        if (email.trim() === '' || password === '') {
            setError('Email and password cannot be empty.');
            return false;
        }
        return true;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        // sign in user
        signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password)
            .then((userCredential) => {
                console.log('Login successful');
                console.log(userCredential.user);
                // need to add the homepage / admin page redirect here
                window.open("http://localhost:3000/dashboard", "_self");
            })
            .catch((err) => {
                if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
                    setError('The email address or password is incorrect');
                } else {
                    setError('Sorry, we encountered an error. Please try again.');
                    console.log(err.code);
                    console.log(err.message);
                }
            });
    };

    const formFields = [
        {
            label: 'Email',
            name: 'email',
            type: 'text',
            stepProps: {
                getState: () => email,
                handleChange: handleEmailChange,
            },
        },
        {
            label: 'Password',
            name: 'password',
            type: 'password',
            stepProps: {
                getState: () => password,
                handleChange: handlePasswordChange,
            },
        },
    ];

    return (
        <>
            <LoginForm fields={formFields} submitButtonText="Login" onSubmit={onSubmit} errorMessage={error} />
        </>
    );
};

export default Login;
