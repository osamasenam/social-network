import {  useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { receivedFriends, addFriend, removeFriend } from "./redux/friends/slice.js";
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

    function addFriendHandler(id) {
        console.log("addFriendHandler clicked");

        fetch(`/addFriend/${id}`, {
            method: "POST",
        })
            .then(res => res.json())
            .then((results) => {
                console.log("results:", results);
                // if success >>> dispatch new action to add friend to status
                if(results.success) {
                    dispatch(addFriend(id));
                }
            })
            .catch(console.log());
    }

    function removeFriendHandler(id) {
        console.log("removeFriendHandler clicked");

        fetch(`/removeFriend/${id}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
        })
            .then(res => res.json())
            .then((results) => {
                console.log("results:", results);
                // if success >>> dispatch new action to remove friend from status
                if(results.success) {
                    dispatch(removeFriend(id));
                }
            })
            .catch(console.log());
    }
    return(
        <>
            <div className="wannabeFriends">
                <h3>These people want to be your friends</h3>
                {wannabeFriends && wannabeFriends.map((friend, i) => (
                    <div key={i}>
                        <Link to={`/user/${friend.id}`}>
                            <p >{friend.first}</p>
                            <img src={friend.image} />
                        </Link>
                        <br></br>
                        <button onClick={() => addFriendHandler(friend.id)}>Accept Friend Request</button> 
                    </div>  
                ))}
            </div>
            <div className="currentFriends">
                <h3>These people are currently your friends</h3>
                {currentFriends && currentFriends.map((friend, i) => (
                    <div key={i}>
                        <Link to={`/user/${friend.id}`}>
                            <p >{friend.first}</p>
                            <img src={friend.image} />
                        </Link>
                        <br></br>
                        <button onClick={() => removeFriendHandler(friend.id)}>End Friendship</button> 
                    </div>
                ))}
            </div>
        </>
    );
}