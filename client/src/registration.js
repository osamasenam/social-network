// class component

import { Component } from "react";
import { Link } from "react-router-dom";

export class Registration extends Component {
    constructor() {
        super();
        this.state = {
            counter: 0,
            showError: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);

    }

    componentDidMount() {
        console.log("Registration just mounted");
    }

    handleChange(e) {
        // console.log("input changed", e.target.name, e.target.value);
        this.setState({
            // always save the input fields to be saved in db after clicking submit
            [e.target.name]: e.target.value,
        }, 
        // () => console.log("state:", this.state)
        );
    }

    handleRegister(e) {
        e.preventDefault();
        console.log("register Btn clicked", this.state);

        fetch("/registration.json", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(this.state),
        })
            .then(res => res.json())
            .then((data) => {
                console.log("data:", data);
                if(!data.success) {
                    this.setState({
                        showError: true,
                        counter: this.state.counter+1,
                    });

                    console.log("this.state",this.state);
                }
                // once the user is registered >>> we can trigger that using location.reload()
                location.reload();
            })
            .catch(console.log());
        // update the error msg in state
    }

    render() {
        return (
            <div className='registration'>
                { this.state.showError && <h1>Error: Please register again!</h1>}
                <h1>Registration</h1>
                {/* <h1>counter {this.state.counter}</h1> */}
                <form>
                    <input type="text" name="first" placeholder="first" onChange={this.handleChange}></input>
                    <input type="text" name="last" placeholder="last" onChange={this.handleChange}></input>
                    <input type="email" name="email" placeholder="email" onChange={this.handleChange}></input>
                    <input type="password" name="password" placeholder="password" onChange={this.handleChange}></input>
                    <button onClick={this.handleRegister}>register</button>
                </form>
                <Link to="/login">Already registered? Please log in</Link>
            </div>
        );    
    }
}