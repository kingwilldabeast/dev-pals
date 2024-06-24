import { useState, useEffect } from 'react'
import '../App.css'
import axios from 'axios'

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

  setFormState(initialState)
  // setFormState(initialState)
 
  {users.map((user) => {
    if (user.username === formState.username || user.email === formState.email ){
    isDuplicate =true
} 
    console.log(user.username)
  
})}
isDuplicate ? console.log('username or email already exists') : console.log('username and email are available')

// {emails.map((email) => {
//   if (email.email === formState.email){
//   isDuplicate =true
// } 
//   console.log(email.email)

// })}
// isDuplicate ? console.log('email already exists') : console.log('email is available')

  };
  
    
  const handleChange=(e) => {
    setFormState({...formState, [e.target.id] : e.target.value})
  }




  return (
    <div className ='signupContainer'>

<h1>Signup</h1>
    
    <form onSubmit={handleSubmit}>
    
    {/* username */}
    <div className='usernameContainer'>
      <input type='text' id='username' placeholder='Username' onChange={handleChange} value={formState.subject} />
    </div>
    
    
    
    

     <div className ='emailContainer'>
    {/* email */}
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
          value={formState.passwordConfirm}
        />
        </div>
    <button type="submit">Sign Up</button>
    {formState.valid === false && (<p>Passwords must match.</p>)}
      </form>
  </div>
    
  )
    
}

    



     


