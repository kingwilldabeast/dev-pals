import { useContext, useEffect, useState } from 'react'
import Header from './Header'
import { useParams } from 'react-router-dom'
import LoggedInUserContext from '../LoggedInUserContext'
import axios from 'axios'

export default function Editor () {
  
  const { username } = useParams()
  const { loggedInUser } = useContext(LoggedInUserContext)
  const [activeUser, setActiveUser] = useState({})


  useEffect(() => {

    const getLoggedInUser = async () => {
      const loggedInUserResponse = await axios.get(`http://localhost:3001/users/usernames/${loggedInUser.username}`)
    //   const loggedInUserResponse = await axios.get(`http://localhost:3001/users/${loggedInUser_ID??}`)
      const loggedInUserData = loggedInUserResponse.data
      setActiveUser(loggedInUserData)
    }
    getLoggedInUser()

  }, [username])

  return (
    <div className='userProfile'>
      <Header/>
      <div className='aboutUser'>
        <h2>About {setActiveUser.firstname}</h2>
        <h3>{setActiveUser.age} Years Old</h3>
        <h3>Lives in {setActiveUser.location}</h3>
      </div>

      
    </div>
  )
}