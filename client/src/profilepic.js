export default function ProfilePic({imgUrl, first, last, clickHandler}) {

    return(
        <div className="profile-pic">
            <img src={imgUrl} alt={`${first} ${last}`} onClick={clickHandler}/>
        </div>
    );
}