// class component

import { Component } from "react";
import { Link } from "react-router-dom";

export class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            error: "",
            step: 1,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleResetPassword = this.handleResetPassword.bind(this);
        this.handleSavePassword = this.handleSavePassword.bind(this);

    }

    componentDidMount() {
        console.log("PasswordReset just mounted");
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

    handleResetPassword(e) {
        e.preventDefault();
        // console.log("Password Reset Btn clicked", this.state);

        fetch("/ResetPassword", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(this.state),
        })
            .then(res => res.json())
            .then((data) => {
                // console.log("data:", data);
                if(data.errMsg) {
                    this.setState({
                        error: data.errMsg,
                    });
                }
                // email exists & we got back the security code
                if(data.success) {
                    // console.log("Email was sent for verification",data.success);
                    this.setState({
                        step: 2,
                        error: "",
                    });
                    
                }
                
            })
            .catch(console.log());
        // update the error msg in state for the case of fetch failure
    }

    handleSavePassword(e) {
        e.preventDefault();
        console.log("Submit Btn clicked", this.state);

        fetch("/SavePassword", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(this.state),
        })
            .then(res => res.json())
            .then((data) => {
                // console.log("data:", data);
                if(data.errMsg) {
                    this.setState({
                        error: data.errMsg,
                    });
                }
                // new password is saved successfully
                if(data.success) {
                    // console.log("new password is saved successfully",data.success);
                    this.setState({
                        step: 3,
                        error: "",
                    });
                    
                }
                
            })
            .catch(console.log());
        // update the error msg in state for the case of fetch failure
    }

    render() {
        if(this.state.step === 1) {
            return (
                <section>
                    { this.state.error && <h1>Error: {this.state.error} </h1>}
                    <h1>Password Reset</h1>
                    <form>
                        <input type="email" name="email" placeholder="email" onChange={this.handleChange}></input>
                        <button onClick={this.handleResetPassword}>Verify Email</button>
                    </form>
                    <Link to="/">Not registered? Please sign up</Link>
                </section>
            );    
        } else if(this.state.step === 2) {
            return (
                <section>
                    { this.state.error && <h1>Error: {this.state.error} </h1>}
                    <h1>Password Reset</h1>
                    <form>
                        <label htmlFor="code">Please enter the code you received by Email </label>
                        <input type="text" name="code" placeholder="code" onChange={this.handleChange}></input>
                        <br></br>
                        <label htmlFor="password">Please enter a new password </label>
                        <input type="password" name="password" placeholder="password" onChange={this.handleChange}></input>
                        <br></br>
                        <button onClick={this.handleSavePassword}>Submit</button>
                    </form>
                </section>
            );  
        }  else if(this.state.step === 3) {
            return (
                <section>
                    { this.state.error && <h1>Error: {this.state.error} </h1>}
                    <h1>Password Reset was done!</h1>
                    <Link to="/login">Please log in</Link>
                </section>
            );  
        }
    }
}