import SignUp from "../features/FirstPage/SignUp";
import SignIn from "../features/FirstPage/SignIn";
import FirstPage from "../features/FirstPage";
import Search from "../features/FirstPage/Search";

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
        path : "/search/:liberianId",
        element : <Search/>
    },
    {
        path: "",
        element: <></>
    }
]