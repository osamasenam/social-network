export default function otherReducer(state = null, action) {
    if (action.type == "friends/otherUser") {
        console.log("other user...",action.payload.data);
        state = action.payload.data;
    }
    return state;
}

//////////////////////// Action Creators //////////////////////////


export function otherUser(data) {
    console.log("action creator otherUser", data);
    return {
        type: "friends/otherUser",
        payload: { data },
    };
}