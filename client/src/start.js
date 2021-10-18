import ReactDOM from "react-dom";
import Welcome from "./welcome.js";
import  App  from "./app.js";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import * as immutableState from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./redux/reducer.js";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);

const elem = (
    <Provider store={store}>
        <App />
    </Provider>
);


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
            ReactDOM.render(elem, document.querySelector("main"));
        }
    })
;