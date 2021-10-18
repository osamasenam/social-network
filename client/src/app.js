import { Component } from "react";
import ProfilePic from "./profilepic.js";
import Uploader from "./uploader.js";
import Profile from "./profile.js";
import FindPeople from "./findpeople.js";
import OtherProfile from "./otherprofile.js";
import Friends from "./friends.js";

import { BrowserRouter, Route} from "react-router-dom";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            "uploaderIsVisible": false,
        };
    }

    componentDidMount() {
        console.log("App component is mounted");
        fetch('/user.json')
            .then(res => res.json())
            .then(data => {
                data.image = data.image || "./default.jpg";
                this.setState(data);
                console.log("App state", this.state);
            })
            .catch(console.log());
    }

    // setBio(latestBio) {
    //     this.setState({
    //         "bio": latestBio
    //     });
    //     console.log("Bio updated", this.state);
    // } 

    render() {
        if(!this.state.id) {
            return(
                <h2>Loading ...</h2>
            ); 
        } else {
            return(
                <BrowserRouter>
                    <>
                        <img src="/logo.png" alt="logo" />
                        <ProfilePic 
                            imgUrl={this.state.image} 
                            first={this.state.first}
                            last={this.state.last}
                            clickHandler= {
                                ()=> {
                                    this.setState({
                                        "uploaderIsVisible": true
                                    });
                                    console.log("profilepic clicked");
                                }
                            }
                        />

                        <Route exact path="/">
                            <Profile 
                                imgUrl={this.state.image} 
                                first={this.state.first}
                                last={this.state.last}
                                bio={this.state.bio}
                                setBio={
                                    (latestBio)=> {
                                    
                                        this.setState({
                                            "bio": latestBio
                                        });
                                        console.log("Bio used",latestBio);
                                        console.log("App this.state",this.state);
                                    }
                                }
                            />
                        </Route>

                        <Route path="/find-people">
                            <FindPeople />
                        </Route>

                        <Route path="/friendsList">
                            <Friends />
                        </Route>

                        <Route path="/user/:otherUserId">
                            <OtherProfile />
                        </Route>

                        {this.state.uploaderIsVisible && (<Uploader 
                            first={this.state.first}
                            closeModal= {
                                ()=> {
                                    this.setState({
                                        "uploaderIsVisible": false
                                    });
                                    console.log("close Modal");
                                // console.log("ImgUrl updated", this.state.image);
                                }
                            }
                            updateImgUrl= {
                                (newUrl)=> {
                                    console.log(newUrl);
                                    this.setState({
                                        "image": newUrl.image
                                    });
                                    console.log("newUrl used",newUrl);
                                    console.log("this.state",this.state);
                                }
                            }
                        />)}
                    </>
                </BrowserRouter>
            );
        }
        
    }
}