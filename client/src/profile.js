import ProfilePic from "./profilepic.js";
import BioEditor from "./bioeditor.js";

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
        </div>
    );
}