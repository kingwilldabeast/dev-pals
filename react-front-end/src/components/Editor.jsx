import { useContext, useEffect, useState } from 'react'
import Header from './Header'
import { useParams, useNavigate } from 'react-router-dom'
import LoggedInUserContext from '../LoggedInUserContext'
import axios from 'axios'

export default function Editor () {
  
    let navigate = useNavigate()
    const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext)
    const [activeUser, setActiveUser] = useState({})
    const { username } = useParams()
    const [message, setMessage]=useState('')
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const initialState = {
        username: "",
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        age: "",
        location: "",
        profilePicURL: "",
    };
    const [formState, setFormState]=useState(initialState);

    useEffect(() => {
  
      const getLoggedInUser = async () => {
        const loggedInUserResponse = await axios.get(`http://localhost:3001/users/usernames/${username}`)
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
        password: activeUser.password || "",
        username: activeUser.username || "",
        email: activeUser.email || "",
        password: activeUser.password || "",
        firstname: activeUser.firstname || "",
        lastname: activeUser.lastname || "",
        age: activeUser.age || "",
        location: activeUser.location || "",
        profilePicURL: activeUser.profilePicURL || ""
        });
    }, [activeUser]); 

    // console.log(activeUser._id)

    const cancelAndReturn =(e) => {
        navigate(`/username/${username}`);
        };

    const logout = () => {
        setLoggedInUser('')
        localStorage.removeItem('loggedInUser')
        navigate('/')
        }

    const deleteAccount = async (e) => {
        try {
            const response = await axios.delete(`http://localhost:3001/users/${activeUser._id}`, {
            }, {
                headers: {
                "Content-Type": "application/json",
                },
            });
                
                console.log(`users are ${response.data}`)
                if (response.status === 200) {
                    console.log("account deleted");
                    logout()
                    navigate(`/signup`);
                } else {
                    console.error("Failed to delete account:", response.statusText);
                }
            } catch (error) {
            console.error("Error:", error)
            }
    }

    const handleSubmit =(e) => {
        e.preventDefault()      
        console.log(formState)
        // setSuccess(true)
        // setMessage("Account updated!")
        updateAccount()
        navigate(`/username/${formState.username}`);
        };
         

    const updateAccount = async () => {
    
        try {
        const response = await axios.put(`http://localhost:3001/users/${activeUser._id}`, {
            username: formState.username,
            email: formState.email,
            password: formState.password,
            firstname: formState.firstname,
            lastname: formState.lastname,
            age: formState.age,
            location: formState.location,
            profilePicURL: formState.profilePicURL
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
      <button type="submit" onClick={cancelAndReturn}>Cancel</button>


      <form onSubmit={handleSubmit}>
    
    {/* username */}
    <div className='usernameContainer'>
      <input type='text' 
      id='username' 
      placeholder='Username' 
      onChange={handleChange} 
      value={formState.username} />
    </div>
    
    {/* email */}
     <div className ='emailContainer'>
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

    {/* firstname */}
    <div className='firstnameContainer'>
      <input type='text' 
      id="firstname" 
      placeholder='First name' 
      onChange = {handleChange} 
      value = {formState.firstname} />
      </div>

    {/* lastname */}
    <div className='lastnameContainer'>
      <input type='text' 
      id="lastname" 
      placeholder='Last name' 
      onChange = {handleChange} 
      value = {formState.lastname} />
    </div>

    {/* age */}
    <div className='ageContainer'>
      <input type='text' 
      id="age" 
      placeholder='Age' 
      onChange = {handleChange} 
      value = {formState.age} />
    </div>

    {/* location */}
    <div className='locationContainer'>
      <input type='text' 
      id="location" 
      placeholder='Location' 
      onChange = {handleChange} 
      value = {formState.location} />
    </div>

    {/* profile pic */}
    <div className='profile-pic-url-Container'>
      <input type='text' 
      id="profilePicURL" 
      placeholder='paste profile link here' 
      onChange = {handleChange} 
      value = {formState.profilePicURL} />
    </div>


     
    <button type="submit">Confirm changes</button>
</form>

    <button type="submit" onClick={deleteAccount}>Delete Account</button>



    </div>
  )
}