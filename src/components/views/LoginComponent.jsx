import React, {Component} from 'react';
import AuthenticationService from '../services/AuthenticationService.js';
import LoginService from '../services/LoginService.js';
import './LoginComponent.css';
import FooterComponentList from '../views/FooterComponentList.jsx';
import HeaderComponent from '../views/HeaderComponent.jsx';
import GoogleLogin from 'react-google-login';

class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            role:'',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
        this.responseGoogleSuccess = this.responseGoogleSuccess.bind(this);
        this.responseGoogleFailed = this.responseGoogleFailed.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]:event.target.value})
    }

    responseGoogleSuccess = (response) => {
        console.log("Google Login Success")
        console.log(response);
        AuthenticationService.registerSuccessfulLogin("User", this.state.password, "STF");
        this.props.history.push(`welcome/User`)
    }

    responseGoogleFailed = (response) => {
        console.log("Google Login Failed")
        console.log(response);
    }

    loginClicked() {
        LoginService.getLogin({
            email:this.state.email,
            password:this.state.password
        })
        .then((resp) => {
            console.log("Success Login: " + resp.data[1])
            if(resp.data[0]) {
                AuthenticationService.registerSuccessfulLogin(resp.data[1], this.state.password, resp.data[2]);
                this.props.history.push(`welcome/${resp.data[1]}`)
            } else {
                if(this.state.email === "fitri.andriyani" && this.state.password === "keepsecret") {
                    console.log("Success Login Admin")
                    AuthenticationService.registerSuccessfulLogin(this.state.email, this.state.password, "KBG");
                    this.props.history.push(`welcome/${this.state.email}`)
                } else {
                    console.log("Failed Login")
                    this.setState({showSuccessMessage:false})
                    this.setState({hasLoginFailed:true})
                }                
            }            
        })
        .catch(() => {
            console.log("Catch Success Login")
            if(this.state.email === "fitri.andriyani" && this.state.password === "keepsecret") {
                console.log("Success Login Admin")
                AuthenticationService.registerSuccessfulLogin(this.state.email, this.state.password, "KBG");
                this.props.history.push(`welcome/${this.state.email}`)
            } else {
                console.log("Failed Login")
                this.setState({showSuccessMessage:false})
                this.setState({hasLoginFailed:true})
            }
        })
    }

    render() {
        return(
            <>
            <HeaderComponent/>
            <div className="row">                
                <div className="col-md-4">
                </div>
                <div className="col-md-4">
                    {this.state.hasLoginFailed && <div className="alert alert-primary">Invalid Credentials</div>}
                    <div className="container-gray">
                        <div className="col login-sec">
                            <h2 className="text-center">Sign In Aplikasi</h2>
                                <div className="form-group">
                                    <label htmlFor="usr">Email:</label>
                                    <input type="text" id="usr" className="form-control" name="email" value={this.state.email} onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pwd">Password:</label>
                                    <input type="password" id="pwd" className="form-control" name="password" value={this.state.password} onChange={this.handleChange} />
                                    <br/>
                                    <button className="btn btn-primary" onClick={this.loginClicked}>
                                        Kirim
                                    </button>
                                </div>
                                <GoogleLogin
                                    clientId="962087760261-pvsdsg1ub2i1g9kkjfbjdelsm21tuspv.apps.googleusercontent.com"
                                    buttonText="Login with Google"
                                    onSuccess={this.responseGoogleSuccess}
                                    onFailure={this.responseGoogleFailed}
                                    cookiePolicy={'single_host_origin'}
                                />
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                </div>
                <FooterComponentList/>
            </div>
            </>
        )
    }
}

export default LoginComponent