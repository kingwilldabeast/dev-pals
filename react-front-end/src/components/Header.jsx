import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../component-style/header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faGear, faArrowRightFromBracket, faHouseUser, faUserGroup } from '@fortawesome/free-solid-svg-icons'

export default function Header () {
  let navigate = useNavigate()

  const loggedInUser = localStorage.getItem('loggedInUser')
  const [activeUser, setActiveUser] = useState({})
  const [inputInProgress, setInputInProgress] = useState({ searchBar: '' });
  const [profile, setProfile] = useState('');
  
  useEffect(() => {
    const getActiveUser = async () => {
      const loggedInUserResponse = await axios.get(`http://localhost:3001/users/${loggedInUser}`)
      // console.log(loggedInUserResponse.data)
      setActiveUser(loggedInUserResponse.data)
    }
    getActiveUser()
  }, [loggedInUser])

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

  const openEditor = (e) => {
    navigate(`/username/edit/${activeUser.username}`);
  }

  const openFriendsList = (e) => {
    navigate(`/username/${activeUser.username}/friends`);
  }

  const logout = () => {
    localStorage.removeItem('loggedInUser')
    navigate('/')
  }

  useEffect(() => {
    if (profile) {
      navigate(`/username/${profile.username}`);
    }
  }, [profile, navigate]);



  return (
    <div className="headerContainer" >
      <Link className="homeBtn" to={'/'}><button><FontAwesomeIcon icon={faHouseUser} /></button></Link>
      {/* Search Bar */}
      <form className="searchBar" onSubmit={handleSubmit}>
        <input className="searchBar"
          name="searchBar"
          placeholder="search a profile"
          type="text"
          value={inputInProgress.searchBar}
          onChange={updateTyping}
          required
        />
        <button className="searchBtn"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
      </form>
      {/* More Bottons Options */}
      <div className="moreBtn">
        <button className="friendsBtn" onClick={openFriendsList}><FontAwesomeIcon icon={faUserGroup} /></button>
        <button className="editorBtn" onClick={openEditor}><FontAwesomeIcon icon={faGear} /></button>
        <button className="logoutBtn" onClick={logout}><FontAwesomeIcon icon={faArrowRightFromBracket} /></button>
      </div>
    </div>
  )
}