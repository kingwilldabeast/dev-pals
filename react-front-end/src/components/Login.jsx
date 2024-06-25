import { Link, useNavigate } from "react-router-dom"
import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
// import LoggedInUserContext from '../LoggedInUserContext'


export default function Login () {
  const initialState = {
    username: '',
    password: '',
    error: ''
  }

  const [formState, setFormState] = useState(initialState)
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext)

  const getUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/users`)
      setUsers(response.data)
      // console.log(response.data)
    } catch (error) {
      console.error('user does not exixt', error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  const getData = async (username) => {
    try {
      
      const response = await axios.get(`http://localhost:3001/users/usernames/${username}`)
      console.log(`users are ${response.data}`)
      
      //assign API results to array
      setLoggedInUser(response.data)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault()

    const user = users.find(user => user.username === formState.username)

    // Checks if user exists
    if (!user) {
      setFormState({
        ...formState,
        error: 'Username does not exist'
      })
      return
    }

    // Checks Password
    if (user.password !== formState.password) {
      setFormState({
        ...formState,
        error: 'Incorrect Password'
      })
      return
    }
    // console.log('Welcome User')
    // navigate('/userProfile/:userId')
    navigate(`/username/${formState.username}`)
  }
  
  const handleChange = (e) => {
    setFormState({...formState,
      [e.target.id] : e.target.value,
      error:''
    })
  }

  return (
    <div className="welcomeContainer">
      <div className="titleContainer">
        <h1>Dev Pals</h1>
        <p>Connect | Network | Share</p>
      </div>

      <form className="loginContainer" onSubmit={handleSubmit}>
        {/* UserName */}
        <div className="emailContainer">
        <input type="text" id="username" placeholder="User Name" onChange={handleChange} value={formState.username} />
        </div>

        {/* Password */}
        <div className="passwordContainer">
          <input type="password" id="password" placeholder="Enter your password" onChange={handleChange} value={formState.password} />
        </div>

        {/* Error Message */}
        {formState.error && <p style={{ color: 'red' }}>{formState.error}</p>}

        {/* Submit Button */}
        <div className="submitBtnContainer">
          <button className="submitBtn" type="submit">Log in</button>
        </div>
        
        {/* Link to Sign up Page */}
        <div className="signupBtnContainer">
          <hr/> 
          <h4>Need an account</h4>
          <button><Link className="signupBtn" to='/signup'>Sign up</Link></button>
          {/* <Link to='/UserProfile'>User Profile</Link> */}
        </div>
      </form>
    </div>
    
  )
}