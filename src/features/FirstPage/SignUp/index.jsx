import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./index.module.css";

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            const response = await fetch('http://localhost:9494/api/v1/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
                setErrorMessage('');
            } else {
                const errorData = await response.json();
                setMessage('');
                setErrorMessage(errorData.error);
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className={style.mainCont}>
            <div className={style.formCont}>
                <h1>Registration Form</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <span className={style.user}>username field cannot be empty</span>
                        {errorMessage && <span className={style.usernameError}>{errorMessage}</span>}
                    </div>
                    <div>
                        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <span className={style.password}>password field cannot be empty</span>
                    </div>
                    <button type="submit">Submit</button>
                    <div className={style.exist}>
                        <span className={style.acct}>Already have an account?</span>
                        <Link to="/signIn" style={{ color: "black" }}>
                            <span className={style.login}>Login</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
