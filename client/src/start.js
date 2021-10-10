import ReactDOM from "react-dom";
import Welcome from "./welcome.js";
import  App  from "./app.js";

// ReactDOM.render(<Welcome />, document.querySelector("main"));
console.log("loading start.js");

fetch('/user/id.json')

    .then(response => response.json())
    .then(data => {
        if (!data.userId) {
            // the user is not registered/ logged in
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            // the user is registered/ logged in
            ReactDOM.render(<App />, document.querySelector("main"));
        }
    })
;