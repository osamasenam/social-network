import { useParams, useHistory } from "react-router";
import { useState, useEffect } from 'react';
import FriendButton from "./friendbutton.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { otherUser } from "./redux/otheruser/slice.js";


export default function OtherProfile(props) {
    const dispatch = useDispatch();
    const { otherUserId } = useParams();

    console.log("OtherProfile props", props);

    const [user, setUser] = useState();
    const [error, setError] = useState();

    const history = useHistory();

    const isFriend = true;

    useEffect(() => {
        console.log("getting clicked person from database...",otherUserId);
        fetch(`/user/${otherUserId}.json`)
            .then(res => res.json())
            .then(results => {
                console.log('results: ', results);
                dispatch(otherUser(results));
                if(results.errMsg == "sameprofile") {
                    history.push("/");
                } else if(results) {
                    setUser(results);
                } 
            })
            .catch((err) => {
                console.log("catch error:",err);
                setError("User not found!");
            });
        return () => {
            console.log(`About to replace the user showed before ${user} with a new user`);
        };
    }, []);

    return(
        <div className="other-profile">
            <h1>You are now Stalking 😉</h1>
            {user && (
                <>
                    <h2>{user.first} {user.last}</h2>
                    <img src={user.image}></img>
                    <h3>{user.bio}</h3>
                    <FriendButton 
                        other = {otherUserId}
                    />
                </>
            )}
            {error && (
                <>
                    <h2>{error}</h2>
                </>
            )}
            {user && isFriend && (
                <Link to={`/chat/${user.id}`}>
                    <button >Private Chat</button>
                </Link>
            )}
        </div>
    );
}