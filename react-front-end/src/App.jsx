import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import UserProfile from './components/UserProfile'
// import FriendsList from './components/FriendsList'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        {/* <Route path="/userProfile" element={<UserProfile/>}/> */}
        <Route path="/userProfile/:userId" element={<UserProfile/>}/>
        {/* <Route path="/userProfile/:userId/friends" element={<FriendsList/>}/> */}
      </Routes>
    </>
  )
}

export default App