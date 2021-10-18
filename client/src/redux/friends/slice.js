export default function friendsReducer(state = null, action) {
    if (action.type == "friends/receivedFriends") {
        console.log("action.payload",action.payload);
        state = action.payload.friends;
    } 
    // else if (action.type == "user/madeHot") {
    //     state = state.map(user => {
    //         if(user.id === action.payload.id) {
    //             return {
    //                 ...user,
    //                 hot: true
    //             };
                
    //         } else {
    //             return user;
    //         }
    //     });
    // } else if (action.type == "user/madeNot") {
    //     state = state.map(user => {
    //         if(user.id === action.payload.id) {
    //             return {
    //                 ...user,
    //                 hot: false
    //             };
                
    //         } else {
    //             return user;
    //         }
    //     });
    // }
    return state;
}

//////////////////////// Action Creators //////////////////////////

export function receivedFriends(friends) {
    return {
        type: "friends/receivedFriends",
        payload: { friends },
    };
}

// export function madeHot(id) {
//     console.log("action creator madeHot", id);
//     return {
//         type: "user/madeHot",
//         payload: { id },
//     };
// }

// export function madeNot(id) {
//     console.log("action creator madeNot", id);
//     return {
//         type: "user/madeNot",
//         payload: { id },
//     };
// }