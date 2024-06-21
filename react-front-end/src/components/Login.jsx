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
          <input placeholder="youremail@email.com" />
        </div>
        {/* Password */}
        <div className="passwordContainer">
          <input  placeholder="Enter your password" />
        </div>
        {/* Submit Button */}
        <div className="submitBtn">
          <button type="submit">Login</button>
        </div>
        {/* Links */}
        <div>
          <Link to='/signup'>Signup</Link>
          {/* <Link to='/UserProfile'>User Profile</Link> */}
        </div>
        
      </div>
      </div>
      
    )
}