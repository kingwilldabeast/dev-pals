import { useContext, useEffect, useState } from 'react'
import Header from './Header'
import { useParams } from 'react-router-dom'
import LoggedInUserContext from './LoggedInUserContext'

export default function UserProfile () {
  
  const [viewedUser, setViewedUser] = useState({})
  const [posts, setPosts] = useState([])
  const [postComments, setPostComments] = useState([])
  const { userId } = useParams()
  const { loggedInUser } = useContext(LoggedInUserContext)
  const [postText, setPostText] = useState('')

  useEffect(() => {

    const getUser = async () => {
      const viewedUserResponse = await axios.get(`http://localhost:3001/users/${userId}`)

      const viewedUserData = viewedUserResponse.data
      setViewedUser(viewedUserData)
    }
    getUser()

    const getUserPosts = async () => {
      const postsResponse = await axios.get(`http://localhost:3001/userPosts/${userId}`)

      const userPosts = postsResponse.data
      setPosts(userPosts)
    }
    getUserPosts()
  }, [userId])

  const createNewPost = async (content) => {
    const newPost = {
      user_id: loggedInUser._id, 
      content: content,
      created_at: new Date(),
      likes: 0
    }

    const response = await axios.post(`http://localhost:3001/posts`, newPost)
    setPosts([response.data.newObject, ...posts])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createNewPost(postText)
    setPostText('')
  }
  
  return (
    <div className='userProfile'>
      <Header/>
      <div className='aboutUser'>
        <h1>About {viewedUser.firstname}</h1>
        <h2>{viewedUser.age} Years Old</h2>
        <h2>Lives in {viewedUser.location}</h2>
      </div>
      <form className='createPost' onSubmit={handleSubmit}>
        <input 
          type="text"
          value={postText} 
          onChange={(e) => setPostText(e.target.value)}
          placeholder='Write your next post here'
        />
        <button className='postButton' type='submit'>Post</button>
      </form>
      <div className='posts'>
        {posts.map(post => (
            <div key={post._id}>
              <p>{new Date(post.created_at).toLocaleString()}</p>
              <p>{post.content}</p>
              <p>Likes: {post.likes}</p>
            </div>
          ))}
      </div>
    </div>
  )
}