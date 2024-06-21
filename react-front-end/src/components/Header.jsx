import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from 'axios'

// import Nav from './Nav'


export default function Header () {
  let navigate = useNavigate()


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
    navigate(`/userProfile/${profile._id}`)
  }

  const getData = async (searchTerm) => {
    const response = await axios.get(`http://localhost:3001/users/${searchTerm}`)
    console.log(`users are ${response.data}`)
    
    //assign API results to array
    setProfile(response.data)

  }


  return (
    <div>
          <h1>Header</h1>
          <form onSubmit={handleSubmit}>
            <input
              name="searchBar"
              placeholder="search a profile"
              type="text"
              value={inputInProgress.searchBar}
              onChange={updateTyping}
              required
            />
            <button>Find profile</button>
          </form>
      <p>{`${profile.username} is logged in`}</p>
      {/* <Nav/> */}
    </div>
  )
}

