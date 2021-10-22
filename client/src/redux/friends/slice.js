export default function friendsReducer(state = null, action) {
    if (action.type == "friends/receivedFriends") {
        console.log("action.payload",action.payload);
        state = action.payload.friends;
    } 
    else if (action.type == "friends/addFriend") {
        console.log("adding...");
        state = state.map(friend => {
            if(friend.id === action.payload.id) {
                return {
                    ...friend,
                    accepted: true
                };
                
            } else {
                return friend;
            }
        });
    } else if (action.type == "friends/removeFriend") {
        console.log("removing...");
        state = state.filter(friend => friend.id !== action.payload.id);
    } 
    return state;
}

//////////////////////// Action Creators //////////////////////////

export function receivedFriends(friends) {
    return {
        type: "friends/receivedFriends",
        payload: { friends },
    };
}

export function addFriend(id) {
    console.log("action creator addFriend", id);
    return {
        type: "friends/addFriend",
        payload: { id },
    };
}

export function removeFriend(id) {
    console.log("action creator removeFriend", id);
    return {
        type: "friends/removeFriend",
        payload: { id },
    };
}

