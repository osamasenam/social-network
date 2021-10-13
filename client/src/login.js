// class component

import { Component } from "react";
import { Link } from "react-router-dom";

export class Login extends Component {
    constructor() {
        super();
        this.state = {
            error: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

    }

    componentDidMount() {
        console.log("Login just mounted");
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

    handleLogin(e) {
        e.preventDefault();
        console.log("Login Btn clicked", this.state);

        fetch("/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(this.state),
        })
            .then(res => res.json())
            .then((data) => {
                console.log("data:", data);
                if(data.errMsg) {
                    this.setState({
                        error: data.errMsg,
                    });

                    console.log("this.state",this.state);
                }
                // once the user is logged in >>> we can trigger that using location.reload()
                if(data.success) {
                    location.replace("/");
                }
                
            })
            .catch(console.log());
        // update the error msg in state for the case of fetch failure
    }

    render() {
        return (
            <section>
                { this.state.error && <h1>Error: {this.state.error} </h1>}
                <h1>Log in</h1>
                <form>
                    <input type="email" name="email" placeholder="email" onChange={this.handleChange}></input>
                    <input type="password" name="password" placeholder="password" onChange={this.handleChange}></input>
                    <button onClick={this.handleLogin}>Login</button>
                </form>
                <Link to="/">Not registered? Please sign up</Link>
                <br></br>
                <Link to="/ResetPassword">Forgot password? Please reset</Link>
            </section>
        );    
    }
}