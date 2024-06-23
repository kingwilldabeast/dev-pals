import { Link } from "react-router-dom"

export default function Login () {
    return (
      <div className="welcomeContainer">
        <div className="titleContainer">
          <h1>Dev Pals</h1>
          <p>Connect | Network | Share</p>
        </div>

        <div className="loginContainer">
        {/* Email */}
        <div className="emailContainer">
          <input type="text" id="email" placeholder="Email or User Name" />
        </div>
        {/* Password */}
        <div className="passwordContainer">
          <input type="text" id="password" placeholder="Enter your password" />
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