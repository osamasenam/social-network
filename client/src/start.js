import ReactDOM from "react-dom";
import Welcome from "./welcome.js";

// ReactDOM.render(<Welcome />, document.querySelector("main"));

fetch('/user/id.json')
    .then(response => response.json())
    .then(data => {
        if (!data.userId) {
            // the user is not registered/ logged in
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            // the user is registered/ logged in
            ReactDOM.render(<img src="logo.png" alt="logo" />, document.querySelector("main"));
        }
    })
;