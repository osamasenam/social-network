import {  useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { receivedFriends } from "./redux/friends/slice.js";
import { Link } from "react-router-dom";


export default function Friends() {
    const dispatch = useDispatch();

    // gives us list of friends/wannabes with the logged in user
    const currentFriends = useSelector(
        (state) => {
            return state.friends && state.friends.filter((friend) => friend.accepted == true);
        }
    );

    const wannabeFriends = useSelector(
        (state) => {
            return state.friends && state.friends.filter((friend) => friend.accepted == false);
        }
    );

    useEffect(() => {
        console.log("Friends component is mounted");

        (async () => {
            const data = await fetch('/friends').then(res => res.json());
            console.log("data",data);
            dispatch(receivedFriends(data));
            console.log("currentFriends",currentFriends);

        })();
    }, []);


    return(
        <>
            <div className="wannabeFriends">
                <h3>These people want to be your friends</h3>
                {wannabeFriends && wannabeFriends.map((friend, i) => (
                    <Link to={`/user/${friend.id}`} key={i}>
                        <p >{friend.first}</p>
                        <img src={friend.image} />
                    </Link>
                        
                ))}
            </div>
            <div className="currentFriends">
                <h3>These people are currently your friends</h3>
                {currentFriends && currentFriends.map((friend, i) => (
                    <Link to={`/user/${friend.id}`} key={i}>
                        <p >{friend.first}</p>
                        <img src={friend.image} />
                    </Link>
                ))}
            </div>
        </>
    );
}
