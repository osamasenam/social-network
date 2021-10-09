// function component
import { Registration } from "./registration.js";
import { Login } from "./login.js";
import { ResetPassword } from "./resetpassword.js";

import { BrowserRouter, Route} from "react-router-dom";

export default function Welcome() {
    return (
        <BrowserRouter>
            <h1>Welcome!</h1>
            <Route exact path="/">
                <Registration />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/ResetPassword">
                <ResetPassword />
            </Route>

        </BrowserRouter>
    );
}