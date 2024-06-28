import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import './component-style/profile.css'
import Login from './components/Login'
import Signup from './components/Signup'
import UserProfile from './components/UserProfile'
import Editor from './components/Editor'
import FriendsList from './components/FriendsList'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/username/:username" element={<UserProfile/>}/>
        <Route path="/username/edit/:username" element={<Editor/>}/>
        <Route path="/username/:username/friends" element={<FriendsList/>}/>
      </Routes>
    </>
  )
}

export default App