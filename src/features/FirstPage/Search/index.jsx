import style from "./index.module.css";
import {Link} from "react-router-dom";
const Search = () =>{
    return (
        <div className={style.mainCont}>
            <div className={style.formCont}>
                <h1>Login Form</h1>
                <form>
                    <div>
                        <input type={"text"} placeholder={"Enter your username"}/>
                        <span className={style.user}>username field cannot be empty</span>
                        <span className={style.usernameError}></span>
                    </div>
                    <div>
                        <input type={"password"} placeholder={"Enter your password"}/>
                        <span className={style.password}>password field cannot be empty</span>
                        <span className={style.passwordError}></span>
                    </div>

                    <button type={"submit"}>Submit</button>
                    <div className={style.exist}>
                        <span className={style.acct}>Dont have an Account?</span>
                        <Link to={"/signUp"} style={{color: "black"}}>
                            <span className={style.login}>SignUp</span></Link>
                    </div>
                </form>

            </div>
        </div>
    )
}
export default Search