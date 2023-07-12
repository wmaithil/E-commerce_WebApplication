import React, {useState} from 'react';
import Base from "../core/Base";
import { Redirect} from "react-router-dom";
import {signin, authenticate, isAuthenticated} from "../auth/helper";

const Signin = () => {

    const [values, setValues] = useState({
        email:"a@maths.com",
        password:"123456",
        error:"",
        loading:false,
        didRedirect:false
    });
    
    const { email, password, error, loading , didRedirect} = values;
    const {user} = isAuthenticated();

    const handleChange = name => event => {
            setValues({...values, error: false, [name]: event.target.value});
        }

    const onSubmit = event => {
            event.preventDefault();
            setValues({...values , error:false, loading:true})
            signin({email,password})
            .then(data => {
                if(data.error){
                    setValues({...values, error: data.error, loading : false })
                }else{
                    authenticate(data,() => {
                        setValues({
                            ...values,
                            didRedirect:true
                        })
                    })
                }
            })
            .catch(
                console.log("SignIn request failed")
            )
        };

    const performRedirect = () => {
            if(didRedirect){
                if(user && user.role === 1){
                    return <Redirect to="/admin/dashboard"/>;
                }else{
                    console.log("Error @ Performing Rediect in SignIn");
                    return <Redirect to="/user/dashboard"/>;
                }
                
            }
            if(isAuthenticated()){
                return <Redirect to="/"/>;
            } 
        };
    
    const loadingMsg = () => {
            return (
            loading && (
                <div className="alert alert-info" >
                    <h2>  Loading ... </h2>
                </div>
            )
        );
        };

    const errorMsg = () => {
            return (
            <div className="alert alert-danger" style={{display : error ? " ":"none"}}>
                {error}
            </div>
            );
        };

const signInForm = () => {
    
    return(
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <form>
                    <div className="form-group py-2">
                        <label className="text-light"> E-Mail</label>
                        <input value={email} onChange={handleChange("email")} className="form-control" type="email" name="" id=""></input>
                    </div>

                    <div className="form-group py-2">
                        <label className="text-light"> Password</label>
                        <input value={password} onChange={handleChange("password")} className="form-control" type="password" name="" id=""></input>
                    </div>
                        
                    <button onClick={onSubmit} className="btn btn-success btn-block "> Submit</button>
                </form>
            </div>
        </div>
    );
};

    return(
        <Base title="Sign In page" description="Welcome to Signin Page">
        {loadingMsg()}
        {errorMsg()}
        {signInForm()}
        {performRedirect()}
        <p className="text-white text-center"> {JSON.stringify(values) }</p>
        </Base>
    );
};

export default Signin;


