import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./index.module.css";

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [pErrorMessage, setPErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:9491/api/v1/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                setErrorMessage("");
                setPErrorMessage("");

                if (username !== "" && password !== "") {
                    navigate(`/search/${data.id}`);
                }
            } else {
                if (data.error) {
                    setPErrorMessage("");
                    setErrorMessage(data.error);
                } else if (data.perror) {
                    setErrorMessage("");
                    setPErrorMessage(data.perror);
                }
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("An unexpected error occurred.");
        }
    };

    return (
        <div className={style.mainCont}>
            <div className={style.formCont}>
                <h1>Login Form</h1>
                <form onSubmit={handleLogin}>
                    <div>
                        <input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        {errorMessage && <span className={style.usernameError}>{errorMessage}</span>}
                    </div>
                    <div>
                        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        {pErrorMessage && <span className={style.passwordError}>{pErrorMessage}</span>}
                    </div>
                    <button type="submit" className={style.bttn}>Submit</button>
                    <div className={style.exist}>
                        <span className={style.acct}>Don't have an Account?</span>
                        <Link to="/signUp" style={{ color: "black" }}>
                            <span className={style.login}>SignUp</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
