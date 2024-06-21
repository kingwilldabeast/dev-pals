import { useContext, useEffect, useState } from 'react'
import Header from './Header'
import { useParams } from 'react-router-dom'

export default function UserProfile () {
  
  // const [posts, setPosts] = useState([])
  // const [postComments, setPostComments] = useState([])
  // const { userId } = useParams
  // const { loggedInUser, setLoggedInUser } = useContext

  // useEffect(() => {

  //   const getUser = async () => {
  //     const userResponse = await axios.get(`http://localhost:3001/users/${userId}`)

  //     const userData = response.data

  //   }
  //   getUser()

  //   const getUserPosts = async () => {
  //     const response = await axios.get('/posts/:id')

  //     const userPosts = response.data
  //   }
  // })
  
  return (
    <div>
      <Header/>
      <h1>User Profile Home Page</h1>
    </div>
  )
}