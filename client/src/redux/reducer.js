import { combineReducers } from "redux";
import friendsReducer from "./friends/slice.js";
import messagesReducer from "./messages/slice.js";
import privateReducer from "./private/slice.js";
import otherReducer from "./otheruser/slice.js";

const rootReducer = combineReducers({
    friends: friendsReducer,
    messages: messagesReducer,
    private: privateReducer,
    other: otherReducer,
});

export default rootReducer;