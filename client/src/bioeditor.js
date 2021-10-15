import { Component } from "react";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "showTextArea": false,
            "draftBio": "",
        };
        this.draftBioHandler = this.draftBioHandler.bind(this);
        // this.getBio = this.getBio.bind(this);
        this.submitHandler = this.submitHandler.bind(this);


    }

    componentDidMount() {
        console.log("BioEditor component is mounted",this.props);

        // check if Bio exists in db
        // bio is passed always from the top App downwards
        // this.getBio(); 
    }
    
    submitHandler() {
        fetch("/postBio", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(this.state),
        })
            .then(res => res.json())
            .then((data) => {
                console.log("data:", data[0]);
                this.setState({
                    "showTextArea": false
                });
                this.props.setBio(data[0].bio);
                console.log("this.state after Bio submit",this.state);
                
            })
            .catch(console.log());
    }

    draftBioHandler(e) {
        this.setState({
            // always save the input fields to be saved in db after clicking submit
            "draftBio": e.target.value,
        }, 
        );
        console.log(this.state);
    }

    // getBio() {
    //     fetch('/getBio')
    //         .then(response => response.json())
    //         .then(result => {
    //             console.log("Bio", result);
    //             this.setState({
    //                 "bio": result.bio
    //             });
    //         })
    //         .catch(err => console.log(err));
    // }

    render() {
        return(
            <div className="bio-editor">
                <h1>Bio</h1>

                {this.state.showTextArea && (
                    <div>
                        <h2>Edit your Bio</h2>
                        <textarea id="bioInput" cols="30" rows="10" onChange={this.draftBioHandler}></textarea>
                        <br></br>
                        <button id="submit" onClick={this.submitHandler}>Submit</button>
                    </div>
                )}

                {!this.state.showTextArea && this.props.bio && (
                    <div>
                        <h2 id="updatedBio">Latest Update: {this.props.bio}</h2>
                    </div>
                )}

                {!this.state.showTextArea && (
                    <div>
                        <button id="add" onClick={  () => {
                            this.setState({
                                "showTextArea": true
                            });}
                        }>Add Bio</button>
                    </div>
                )}


            </div>

                    
        );
    }
}
