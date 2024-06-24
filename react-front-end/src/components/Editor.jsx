import { useContext, useEffect, useState } from 'react'
import Header from './Header'
import { useParams, useNavigate } from 'react-router-dom'
import LoggedInUserContext from '../LoggedInUserContext'
import axios from 'axios'

export default function Editor () {
  
    let navigate = useNavigate()
    const { loggedInUser } = useContext(LoggedInUserContext)
    const [activeUser, setActiveUser] = useState({})
    const { username } = useParams()
    const [message, setMessage]=useState('')
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const initialState = {
        username: "",
        email: "",
        password: ""
    };
    const [formState, setFormState]=useState(initialState);

    useEffect(() => {
  
      const getLoggedInUser = async () => {
        const loggedInUserResponse = await axios.get(`http://localhost:3001/users/usernames/${loggedInUser.username}`)
      //   const loggedInUserResponse = await axios.get(`http://localhost:3001/users/${loggedInUser_ID??}`)
        const loggedInUserData = loggedInUserResponse.data
        setActiveUser(loggedInUserData)
    }
    getLoggedInUser()
    
}, [loggedInUser.username])


    useEffect(() => {
        setFormState({
        username: activeUser.username || "",
        email: activeUser.email || "",
        password: activeUser.password || ""
        });
    }, [activeUser]); 

    console.log(activeUser._id)

    const handleSubmit =(e) => {
        e.preventDefault()      
        console.log(formState)
        // setSuccess(true)
        // setMessage("Account updated!")
        updateAccount()
        navigate(`/username/edit/${loggedInUser.username}`);
        };
         

    const updateAccount = async () => {
    
        try {
        const response = await axios.put(`http://localhost:3001/users/${activeUser._id}`, {
            username: formState.username,
            email: formState.email,
            password: formState.password,
        }, {
            headers: {
            "Content-Type": "application/json",
            },
        });
            
            console.log(`users are ${response.data}`)
            if (response.status === 200) {
                console.log("account updated");
            } else {
                console.error("Failed to update account:", response.statusText);
            }
        } catch (error) {
        console.error("Error:", error)
        }
    
    }
        
          
        const handleChange=(e) => {
          setFormState({...formState, [e.target.id] : e.target.value})
        }
      

  return (
    <div className='userProfile'>
      <Header/>
      <div className='aboutUser'>

      </div>

      <form onSubmit={handleSubmit}>
    
    {/* username */}
    <div className='usernameContainer'>
      <input type='text' 
      id='username' 
      placeholder='Username' 
      onChange={handleChange} 
      value={formState.username} />
    </div>
    
     <div className ='emailContainer'>
    {/* email */}
      <input type="text" 
      id="email" 
      placeholder='Email' 
      onChange = {handleChange} 
      value={formState.email}
      />
    </div>
    
    {/* password */}
    <div className='passwordContainer'>
      <input type='text' 
      id="password" 
      placeholder='Password' 
      onChange = {handleChange} 
      value = {formState.password} />
      </div>
     
    <button type="submit">Confirm changes</button>
    <p className={success ? 'valid' : (failure ? 'invalid' : null)} >
        {message}
        </p>
      </form>

    </div>
  )
}