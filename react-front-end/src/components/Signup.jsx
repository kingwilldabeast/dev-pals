import { useState } from 'react'
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


const handleSubmit =(e) => {

  e.preventDefault()
  setFormState(initialState)
  // setFormState(initialState)
  if(formState.password === formState.passwordConfirm){
    setFormState ({...formState, valid:true})
  }else{
    setFormState({...formState, valid:false})
  }
    
    console.log(formState)
    // setFormState(initialState)
  }
    
  const handleChange=(e) => {
    setFormState({...formState, [e.target.id] : e.target.value})
  }

  return (
    <div className ='signupContainer'>

<h1>Signup</h1>
    
    <form onSubmit={handleSubmit}>
    
    {/* username */}
    <div className='usernameContainer'>
    
    <label htmlFor="username">Username: </label>
      <input type='text' id='username' placeholder='Username' onChange={handleChange} value={formState.subject} />
    
    </div>
    

     <div className ='emailContainer'>
    
    {/* email */}
    <label htmlFor="email">Email: </label>
      <input type="text" id="email" placeholder='Email' onChange = {handleChange} value={formState.email}/>
    
    </div>

    {/* password */}
    <div className='passwordContainer'>
     <label htmlFor="password">Password: </label>
      <input type='password' id="password" placeholder='Password' onChange = {handleChange} value = {formState.password} />
      </div>

    {/* confirm password */}
    <div className='confirm-passwordContainer'>
    <label htmlFor="passwordConfirm">Confirm password</label>
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
    



     


