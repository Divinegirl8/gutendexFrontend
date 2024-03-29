import style from "./index.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Modal from "../Modal";

const ForgotPassword = () =>{
    const  [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [pErrorMessage, setPErrorMessage] = useState("");
    const [showModal,setShowModal] = useState(false);
    const navigate = useNavigate();

    const  handleForgotPassword = async (e) =>{
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:9491/api/v1/forgotPassword',{
                method : "POST",
                headers:{
                    'Content-Type' : 'application/json'
            },body : JSON.stringify({username,password})
            })
            const data = await response.json();

            if (response.ok){
                setErrorMessage("")
                setPErrorMessage("");
                setShowModal(true);
            }else {
                if(data.error) {
                setErrorMessage(data.error);
                setPErrorMessage("");}
                else if(data.perror){
                    setErrorMessage("");
                    setPErrorMessage(data.perror)
                }
        }

        }catch (error){
            setErrorMessage("bad network");
        }

    }
    const togglePassword=()=>{
        setShowPassword(!showPassword);
    }

    const closeModal = () =>{
        setShowModal(false);
        navigate("/signIn");

    }
    return(
        <>
            {showModal && (
                <div className={style.modalBackdrop}>
                    <div className={style.modalContent}>
                        <Modal message={"your password has been reset"} onClose={closeModal}/>
                    </div>
                </div>
            )}
            <div  className={style.mainCont}>
                <div className={style.formCont}>
                    <h1>Forgot Password Form</h1>
                    <form onSubmit={handleForgotPassword}>
                        <div>
                            <input type="text" placeholder="Enter your username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                            {errorMessage && <span className={style.usernameError}>{errorMessage}</span>}
                        </div>
                        <div style={{display: "flex", flexDirection: "row"}}>
                           <div>
                               <input type={showPassword ? "text" : "password"} placeholder="Enter your new password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                               { pErrorMessage && <span className={style.passwordError}>{pErrorMessage}</span>}
                           </div>
                            <button className={style.butn} style={{
                                marginLeft: "-50px",
                                width: "50px",
                                backgroundColor: "white",
                                color: "black",
                                marginTop: "18px",
                                border: "none"
                            }} onClick={togglePassword} type="button">
                                {showPassword ? <FontAwesomeIcon icon={faEyeSlash}/> : <FontAwesomeIcon icon={faEye}/>}
                            </button>
                        </div>
                        <button type="submit" className={style.butn}>Submit</button>
                        <div className={style.exist}>
                            <span className={style.acct}>Don't have an Account?</span>
                            <Link to="/signUp" style={{color: "black"}}>
                                <span className={style.login}>SignUp</span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>


        </>
    )
}
export default ForgotPassword;