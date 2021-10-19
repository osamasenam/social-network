import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { receivedFriends } from "./redux/friends/slice.js";


export default function FriendButton(props) {
    // const dispatch = useDispatch();

    const [text, setText] = useState();

    useEffect(() => {
        console.log("getting friendship status from database with user ID:",props.other);
        fetch(`/getFriendship/${props.other}`)
            .then(res => res.json())
            .then(results => {
                console.log('results: ', results);
                setText(results.btnText);
            })
            .catch((err) => {
                console.log("catch error:",err);
            });
        
    }, []);

    function btnClickHandler() {
        console.log("button clicked");

        fetch(`/getFriendship/${props.other}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"text": text}),
        })
            .then(res => res.json())
            .then((results) => {
                console.log("results:", results);
                // updateReduxState();
                setText(results.btnText);
                
            })
            .catch(console.log());
        
    }

    // function updateReduxState() {
    //     (async () => {
    //         const data = await fetch('/friends').then(res => res.json());
    //         console.log("updated friends",data);
    //         dispatch(receivedFriends(data));

    //     })();
    // }

    return(
        <button onClick={btnClickHandler}>{text}</button>
    );
}