import ReactDOM from "react-dom";
import Welcome from "./welcome.js";
import  App  from "./app.js";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import * as immutableState from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./redux/reducer.js";
import { init } from "./socket.js";

// import { io } from 'socket.io-client';

// const socket = io.connect();

// // the client is listening to the server
// socket.on('greeting', data => {
//     console.log('data: ', data);
// });

// // the client is listening to the server
// socket.on('helloAll', data => {
//     console.log('data: ', data);
// });

// // the client is listening to the server
// socket.on('message', data => {
//     console.log('data: ', data);
// });

// // the client sends to the server
// socket.emit('thanks', {
//     info: [
//         'thanks for the message',
//         'it was so lovely',
//         'welcome to the neighbourhood'
//     ]
// });

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
            init(store);
            // the user is registered/ logged in
            ReactDOM.render(elem, document.querySelector("main"));
        }
    })
;