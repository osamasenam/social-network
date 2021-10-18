import ProfilePic from "./profilepic.js";
import BioEditor from "./bioeditor.js";
import { Link } from "react-router-dom";

export default function Profile(props) {
    console.log("Profile props", props);
    return(
        <div className="container">
            <h1>{props.first} {props.last} Profile </h1>

            <ProfilePic 
                imgUrl={props.imgUrl} 
                first={props.first}
                last={props.last}
            />

            <BioEditor
                bio={props.bio}
                setBio={props.setBio}
            />

            <Link to="/find-people">Find other friends</Link>

            <br></br>

            <Link to="/friendsList">Friends</Link>

        </div>
    );
}