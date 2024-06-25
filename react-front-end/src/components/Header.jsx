import { useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from 'react'
import LoggedInUserContext from '../LoggedInUserContext'
import axios from 'axios'
import profileImg from '../assets/profileImg.png'
import '../profile.css'

export default function Header () {
  let navigate = useNavigate()

  const {loggedInUser, setLoggedInUser} = useContext(LoggedInUserContext)
  const [inputInProgress, setInputInProgress] = useState({ searchBar: '' });
  const [profile, setProfile] = useState('');

  
  const updateTyping = (e) => {
    setInputInProgress({ ...inputInProgress, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(`input is ${inputInProgress.searchBar}`)
    const searchTerm = inputInProgress.searchBar;
    setInputInProgress({searchBar:''})
    getData(searchTerm)
  }
  const getData = async (searchTerm) => {
    try {
      
      const response = await axios.get(`http://localhost:3001/users/usernames/${searchTerm}`)
      console.log(`users are ${response.data}`)
      
      //assign API results to array
      setProfile(response.data)
    } catch (error) {
      console.error("Error fetching data:", error)
    }

  }

  useEffect(() => {
    if (profile) {
      navigate(`/username/${profile.username}`);
    }
  }, [profile, navigate]);
  return (
    <div className="headerContainer" >
          <img className="profileImage" src={profileImg} alt="Profile Image" width={200} />
          <h1>Header</h1>
          <form onSubmit={handleSubmit}>
            <input className="searchBar"
              name="searchBar"
              placeholder="search a profile"
              type="text"
              value={inputInProgress.searchBar}
              onChange={updateTyping}
              required
            />
            <button>Find profile</button>
          </form>
      <p>{`${loggedInUser.username} is logged in`}</p>
    </div>
  )
}