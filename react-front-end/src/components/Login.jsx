import { Link } from "react-router-dom"
import { useState } from 'react'

export default function Login () {

  const initialState = {
    email: '',
    password: '',
    error: ''
  }

  const [formState, setFormState] =useState(initialState)

  const handleSubmit = (e) => {
    e.preventDefault()

    if () {
      setFormState({
        ...formState,
        error: ''
      })
    }
  }


  return (
    <div className="welcomeContainer">
      <div className="titleContainer">
        <h1>Dev Pals</h1>
        <p>Connect | Network | Share</p>
      </div>

      <div className="loginContainer" onSubmit={props.handleSubmit}>
        {/* Email */}
        <div className="emailContainer">
        <input type="text" id="email" placeholder="Email or User Name" onChange={props.handleChange} Value={props.formState.email || props.formState.username} />
        </div>

        {/* Password */}
        <div className="passwordContainer">
          <input type="text" id="password" placeholder="Enter your password" onChange={props.handleChange} value={props.formState.password} />
        </div>

        {/* Submit Button */}
        <div className="submitBtnContainer">
          <button className="submitBtn" type="submit">Log in</button>
        </div>
        
        {/* Links */}
        <div className="signupContainer">
          <hr/> 
          <h4>Need an account</h4>
          <button><Link className="signupBtn" to='/signup'>Sign up</Link></button>
          {/* <Link to='/UserProfile'>User Profile</Link> */}
        </div>
      </div>
    </div>
    
  )
}