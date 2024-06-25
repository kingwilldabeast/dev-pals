import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import UserProfile from './components/UserProfile'
import Editor from './components/Editor'
import { useState } from 'react'
import LoggedInUserContext from './LoggedInUserContext'
// import FriendsList from './components/FriendsList'

function App() {
  
  const [loggedInUser, setLoggedInUser] = useState('66779b976f742d445e0b75d8')

  return (
    <>
      <LoggedInUserContext.Provider value={{loggedInUser, setLoggedInUser}}>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/username/:username" element={<UserProfile/>}/>
          <Route path="/username/edit/:username" element={<Editor/>}/>
          {/* <Route path="/userProfile/:userId" element={<UserProfile/>}/> */}
          {/* <Route path="/userProfile/:userId/friends" element={<FriendsList/>}/> */}
        </Routes>
      </LoggedInUserContext.Provider>
    </>
  )
}

export default App