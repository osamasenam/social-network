export default function privateReducer(state = null, action) {
    if (action.type == "messages/lastTenMessagesPrivate") {
        console.log("adding last Ten Private Messages...");
        state = action.payload.dbMessagesPrivate;
    } 
    else if (action.type == "messages/newMessagePrivate") {
        console.log("adding a new Private msg...");
        state = [...state,action.payload.dbMessagePrivate];
    } 
    return state;
}

//////////////////////// Action Creators //////////////////////////


export function lastTenMessagesPrivate(dbMessagesPrivate) {
    // console.log("action creator lastTenMessages", dbMessages);
    return {
        type: "messages/lastTenMessagesPrivate",
        payload: { dbMessagesPrivate },
    };
}

export function newMessagePrivate(dbMessagePrivate) {
    // console.log("action creator newMessage", dbMessage);
    return {
        type: "messages/newMessagePrivate",
        payload: { dbMessagePrivate },
    };
}