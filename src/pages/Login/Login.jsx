import React, { useState } from 'react'
import './Login.css'
import logoBig from '../../assets/Chatify.webp'
import { signup,login} from '../../config/firebase'

const Login = () => {
    const[currState,setCurrState]=useState("Sign Up");
    const[userName,setUserName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const onSubmitHandler=(event)=>{
        event.preventDefault();
        if(currState=="Sign Up"){
            signup(userName,email,password);
        }
        else{
            login(email,password);
        }
    }
  return (
    <div className='login'>
        <img src={logoBig} alt="" className="logo"/> 
        <form onSubmit={onSubmitHandler}className="login-form">
            <h2>{currState}</h2>
           {currState==="Sign Up"? <input onChange={(e)=>{setUserName(e.target.value) }} value={userName}type="text" placeholder='username'  required className="form-input" />:null}
            <input onChange={(e)=>{setEmail(e.target.value)}} value={email} type="email" placeholder='email address' required className="form-input" />
            <input onChange={(e)=>{setPassword(e.target.value)}} value={password} type="password"  placeholder='password'className="form-input" required />
            <button type="submit" >{currState==="Sign Up"?"Create Account":"Login"}</button>
            <div className="login-term">
                <input type="checkbox"/>
                <p>Agree to the terms of use & privacy policy</p>
            </div>
            <div className="login-forgot">

                    {
                        currState=="Sign Up"?<p className="login-toggle">Already have an Account<span onClick={()=>setCurrState("Login")}> Login Here</span></p>:<p className="login-toggle">Create an Account<span onClick={()=>setCurrState("Sign Up")}> Click Here</span></p>
                    }
               
            </div>

        </form>
      
    </div>
  )
}

export default Login
