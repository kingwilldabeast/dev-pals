import { useState, useEffect } from 'react';
import '../component-style/signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import GetStartedModal from './GetStartedModal';
import {Link} from 'react-router-dom'
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
const [message, setMessage]=useState('')
const [success, setSuccess] = useState(false);
const [failure, setFailure] = useState(false);
const [showModal, setShowModal] = useState(false);
const navigate = useNavigate();


const getUsers = async () => {
  const response = await axios.get(`http://localhost:3001/users`)
  setUsers(response.data)
  
  // console.log(response.data)
};

useEffect(() => {
    getUsers();
    }, [])
  


const handleSubmit = async (e) => {
  e.preventDefault()
  
  if(!formState.email || !formState.password || !formState.passwordConfirm || !formState.username) {
    setMessage(`All fields are required`)
    setFailure(true)
    return
  }
   
  let isDuplicate=false
  
  console.log(formState)


    if (formState.password !== formState.passwordConfirm) {
      setMessage("Passwords do not match")
      setFailure(true)
    } else if (formState.password.length < 7) {
      setMessage("Passwords match but are too short")
      setFailure(true) }
    else {
      {users.map((user) => {
        if (user.username === formState.username || user.email === formState.email ){
            isDuplicate =true
        } 
            // console.log(user.username)
          
        })};
    
          if (isDuplicate) {
            setMessage("username or email already exists") 
            setFailure(true)
          } else {
            formState.valid = true
            console.log(formState)
            setSuccess(true)
            setMessage("Account created!")
            // setFormState(initialState) //wipe and reset 
            await addNewAccount()
        };
    };
  };
            
    
   
    const logInUser = async (username) => {
        try {
          const response = await axios.get(`http://localhost:3001/users/username/${username}`)
          localStorage.setItem('loggedInUser', response.data._id)
        } catch (error) {
          console.error("Error fetching data:", error)
        }
      };
    

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
     await logInUser(formState.username)  

       console.log(`users are ${response.data}`)

       if (response.status === 201) {
         handleShow()
           console.log("account created");
       } else {
           console.error("Failed to add account:", response.statusText);
       }
   } catch (error) {
     console.error("Error:", error)
   }
 
 };
  
 const handleChange=(e) => {
   setFormState({...formState, [e.target.id] : e.target.value})
 };

 const handleShow = () => setShowModal(true);
 const handleClose = () => setShowModal(false);


 return (
    
    
   <div className ='signupContainer'>
     <h1>Signup</h1>
    
   <form onSubmit={handleSubmit}>

   {/* username */}
   <div className='usernameContainer'>
     <input type='text' id='username' placeholder='Username' onChange={handleChange} value={formState.username} />
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
         value={formState.passwordConfirm}
       />
       </div>

       <button className='signupSubmitBtn' type="submit" variant='primary'>Sign Up</button>
       <p className={success ? 'valid' : (failure ? 'invalid' : null)}>
         {message}
       </p>
       <GetStartedModal show={showModal} handleClose={handleClose} />
       <Link to = '/'><button className='backtologinBtn'>Back to Login</button></Link>
     </form>
 </div>
   
 )
   
}

   
   
   

   
   
   








  
    




    



     


