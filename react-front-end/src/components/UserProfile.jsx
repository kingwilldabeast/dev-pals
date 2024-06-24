import { useContext, useEffect, useState } from 'react'
import Header from './Header'
import { useParams } from 'react-router-dom'
import LoggedInUserContext from '../LoggedInUserContext'
import axios from 'axios'

export default function UserProfile () {
  
  const [viewedUser, setViewedUser] = useState({})
  const [posts, setPosts] = useState([])
  const [postText, setPostText] = useState('')
  const [postComments, setPostComments] = useState({})
  const { userId } = useParams()
  const { loggedInUser } = useContext(LoggedInUserContext)

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

      userPosts.forEach(post => getPostComments(post._id))
    }
    getUserPosts()

    const getPostComments = async (postId) => {
      const commentsResponse = await axios.get(`http://localhost:3001/postComments/${postId}`)
      const comments = commentsResponse.data
      // Had trouble with state here. The problem is that I didn't need an array of comments like I thought, because each postId has comments that are assigned to it. This means that we need to hold the postId and the array of its comments as a pair in an object like this: { postId1: [{comment1}, {comment2}], postId2: [{comment1}] } Therefore, we need to make sure that each unique postId is added to the object without replacing the previous postId's.
      setPostComments(prevState => ({
        ...prevState,
        [postId]: comments
      }))
    }
    getPostComments()
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

  const handleSubmitPost = (e) => {
    e.preventDefault()
    createNewPost(postText)
    setPostText('')
  }

  const handleRemovePost = async (postId) => {
    await axios.delete(`http://localhost:3001/posts/${postId}`)
    setPosts(posts.filter(post => post._id !== postId))
  }

  const handleAddLike = async (postId) => {
    try {
      const post = posts.find(post => post._id === postId)
      const isLikedByUser = post.likes > 0
  
      const operation = isLikedByUser ? 'unlike' : 'like'
      const response = await axios.put(`http://localhost:3001/posts/${postId}/${operation}`)
  
      const updatedPost = response.data
  
      setPosts(posts.map(post => post._id === postId ? updatedPost : post))
    } catch (error) {
      console.error("Error liking/unliking the post:", error)
    }
  }
  
  return (
    <div className='userProfile'>
      <Header/>
      <div className='aboutUser'>
        <h1>About {viewedUser.firstname}</h1>
        <h2>{viewedUser.age} Years Old</h2>
        <h2>Lives in {viewedUser.location}</h2>
      </div>
      <form className='createPost' onSubmit={handleSubmitPost}>
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
            <div className='post' key={post._id}>
              <h4>{new Date(post.created_at).toLocaleString()}</h4>
              <h4>{post.content}</h4>
              <h4>Likes: {post.likes}</h4>
              <button className='likePostButton' onClick={() => handleAddLike(post._id)}>Like</button>
              {/* <button className='editPostButton'>Edit</button> */}
              <button className='removePostButton' onClick={() => handleRemovePost(post._id)}>Remove</button>
              <div className='comments'>
              {postComments[post._id]?.map(comment => (
                <div className='comment' key={comment._id}>
                  {/* <img src={comment.user_id.profilePicURL}/> */}
                  <p>{`${comment.user_id.firstname} ${comment.user_id.lastname}`}</p>
                  <p>{comment.content}</p>
                  <p>{new Date(comment.created_at).toLocaleString()}</p>
                  <p>Likes: {comment.likes}</p>
                </div>
              ))}
            </div>
            </div>
          ))}
      </div>
    </div>
  )
}