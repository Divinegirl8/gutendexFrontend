import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./index.module.css";

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [passwordErrorMessage,setPasswordErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:9491/api/v1/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
                setUsernameErrorMessage('');
                setPasswordErrorMessage('');
            } else {
                const errorData = await response.json();

                setMessage('');
                if(errorData.error){
                    setUsernameErrorMessage(errorData.error);
                    setPasswordErrorMessage(" ");
                }
                else if(errorData.pError){
                    setUsernameErrorMessage(" ");
                    setPasswordErrorMessage(errorData.pError);
                }

            }
        } catch (error) {
            setUsernameErrorMessage(error.message);
            setPasswordErrorMessage(error.message);
        }
    };

    return (
        <div className={style.mainCont}>
            <div className={style.formCont}>
                <h1>Registration Form</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        {usernameErrorMessage && <span className={style.usernameError}>{usernameErrorMessage}</span>}
                    </div>
                    <div>
                        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        {passwordErrorMessage && <span className={style.password}>{passwordErrorMessage}</span>}
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
