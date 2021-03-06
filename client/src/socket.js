import { io } from "socket.io-client";
import {
    lastTenMessages,
    newMessage,
    lastTenMessagesPrivate,
    newMessagePrivate,
} from "./redux/messages/slice.js";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("mostRecentMsgs", (msgs) =>
            store.dispatch(lastTenMessages(msgs))
        );

        socket.on("mostRecentMsgsPrivate", (msgs) =>
            store.dispatch(lastTenMessagesPrivate(msgs))
        );

        // socket.on("chatMessage", (msg) =>
        //     store.dispatch(chatMessageReceived(msg))
        // );

        socket.on("addChatMsg", (msg) => {
            // console.log(`Got a message in the client!! I'm about to start the whoooole Redux process by dispatching in here!!
            // My message is `,msg);
            // this is where you should dispatch an action to put this message in redux
            store.dispatch(newMessage(msg));
        });

        socket.on("addChatMsgPrivate", (msg) => {
            // console.log(`Got a message in the client!! I'm about to start the whoooole Redux process by dispatching in here!!
            // My message is `,msg);
            // this is where you should dispatch an action to put this message in redux
            store.dispatch(newMessagePrivate(msg));
        });

    }
};