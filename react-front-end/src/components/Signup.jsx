import { useState, useEffect } from 'react'
import '../component-style/signup.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
//  const { loggedInUser } = useContext(LoggedInUserContext)

export default function Signup () {
const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
  valid: false
};

const [formState, setFormState]=useState(initialState);
const [users, setUsers]=useState([]);
const [emails, setEmails]=useState([]);
const [message, setMessage]=useState('')
const [success, setSuccess] = useState(false);
const [failure, setFailure] = useState(false);
const navigate = useNavigate();

// const { loggedInUser } = useContext(LoggedInUserContext)
// const [duplicateUser, setDuplicateUser]=useState(false);
// const [emails, setEmails]=useState([]);

const getUsers = async () => {
  const response = await axios.get(`http://localhost:3001/users`)
  setUsers(response.data)
  setEmails(response.data)
  // console.log(response.data)
}

useEffect(() => {
  
getUsers()
}, []) 



const handleSubmit =(e) => {
  e.preventDefault()

  let isDuplicate=false

    console.log(formState)
    if (formState.password !== formState.passwordConfirm) {
      setMessage("Passwords do not match")
      setFailure(true)
    } else if (formState.password.length < 7) {
      setMessage("Passwords match but are too short")
      setFailure(true)
    }
    else {
      {users.map((user) => {
        if (user.username === formState.username || user.email === formState.email ){
            isDuplicate =true
        } 
            // console.log(user.username)
          
        })}
    
          if (isDuplicate == true ) {
            setMessage("username or email already exists") 
            setFailure(true)
          } else {
            formState.valid = true
            console.log(formState)
            setSuccess(true)
            setMessage("Account created!")
            setFormState(initialState) //wipe and reset 
            addNewAccount()
    
          }
      };
    }
   
  





  const addNewAccount = async () => {
  
    try {
      const response = await axios.post("http://localhost:3001/users", {
        username: formState.username,
        password: formState.password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
        
        console.log(`users are ${response.data}`)
        if (response.status === 201) {
          // navigate(`/userProfile/${response.data._id}`)
          navigate(`/username/${formState.username}`)
            // const newEvent = await response.json();
            console.log("account created");
        } else {
            console.error("Failed to add account:", response.statusText);
        }
    } catch (error) {
      console.error("Error:", error)
    }
  
  }
  
    
  const handleChange=(e) => {
    setFormState({...formState, [e.target.id] : e.target.value})
  }




  return (
    <div className ='signupContainer'>
      <h1 className='signupTitle' >Sign up</h1>

      <form onSubmit={handleSubmit}>
        {/* username */}
        <div className='usernameContainer'>
          <input type='text' id='username' placeholder='Username' onChange={handleChange} value={formState.subject} />
        </div>

        {/* email */}
        <div className ='emailContainer'>
          <input type="text" id="email" placeholder='Email' onChange = {handleChange} value={formState.email}/>
        </div>
      
        {/* password */}
        <div className='passwordContainer'>
          <input type='password' 
            id="password" 
            placeholder='Password' 
            onChange = {handleChange} value = {formState.password} />
        </div>
      
        {/* confirm password */}
        <div className='confirm-passwordContainer'>
          <input
            type="password"
            placeholder="Confirm password"
            id="passwordConfirm"
            onChange ={handleChange} 
            value={formState.passwordConfirm}/>
        </div>
        {/* Submit Button */}
        <button className="signupSubmitBtn" type="submit">Sign Up</button>
          <p className={success ? 'valid' : (failure ? 'invalid' : null)} >
            {message}
            </p>
      </form>
    </div>
    
  )
    
}

    



     


