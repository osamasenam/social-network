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
        <div className="friends">
            <div className="wannabeFriends">
                {wannabeFriends && wannabeFriends.length != 0?   <h3>You got request from</h3> : <h3>No one wanna be your friend 😏</h3> }
                <div className="container">
                    {wannabeFriends && wannabeFriends.map((friend, i) => (
                        <div key={i}>
                            <Link to={`/user/${friend.id}`}>
                                <p >{friend.first}</p>
                                <div>
                                    <img src={friend.image} />
                                </div>
                            </Link>
                            <br></br>
                            <button onClick={() => addFriendHandler(friend.id)}>Accept Friend Request</button> 
                        </div>  
                    ))}
                </div>
            </div>
            <div className="currentFriends">
                {currentFriends && currentFriends.length != 0?  <h3>Your current friends</h3> : <h3>No Friends you loser 🤪</h3> }
                <div className="container">
                    {currentFriends && currentFriends.map((friend, i) => (
                        <div key={i}>
                            <Link to={`/user/${friend.id}`}>
                                <p >{friend.first}</p>
                                <div>
                                    <img src={friend.image} />
                                </div>
                            </Link>
                            <br></br>
                            <button onClick={() => removeFriendHandler(friend.id)}>End Friendship</button> 
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
