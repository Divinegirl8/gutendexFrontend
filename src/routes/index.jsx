import SignUp from "../features/FirstPage/SignUp";
import SignIn from "../features/FirstPage/SignIn";
import FirstPage from "../features/FirstPage";

export const Routes = [
    {
        path : "",
        element : <FirstPage/>
    },
    {
        path : "/signUp",
        element : <SignUp/>
    },
    {
        path : "/signIn",
        element : <SignIn/>
    },
    {
        path : "",
        element : <h2>hi</h2>
    }
]