import { useContext, useEffect, useState } from 'react'
import Header from './Header'
import { useParams } from 'react-router-dom'
import LoggedInUserContext from '../LoggedInUserContext'
import axios from 'axios'

export default function UserProfile () {
  
  const [viewedUser, setViewedUser] = useState({})
  const [activeUser, setactiveUser] = useState({})
  const [posts, setPosts] = useState([])
  const [postText, setPostText] = useState('')
  const [postComments, setPostComments] = useState({})
  const { username } = useParams()
  const { loggedInUser } = useContext(LoggedInUserContext)

  useEffect(() => {

    const getViewedUser = async () => {
      const viewedUserResponse = await axios.get(`http://localhost:3001/users/usernames/${username}`)
      const viewedUserData = viewedUserResponse.data
      setViewedUser(viewedUserData)
    }
    getViewedUser()

    const getLoggedInUser = async () => {
      const loggedInUserResponse = await axios.get(`http://localhost:3001/users/${loggedInUser}`)
      const loggedInUserData = loggedInUserResponse.data
      setactiveUser(loggedInUserData)
    }
    getLoggedInUser()

    // const getUserPosts = async () => {
    //   const postsResponse = await axios.get(`http://localhost:3001/userPosts/${username}`)
    //   const userPosts = postsResponse.data
    //   setPosts(userPosts)

    //   userPosts.forEach(post => getPostComments(post._id))
    // }
    // getUserPosts()

    // const getPostComments = async (postId) => {
    //   const commentsResponse = await axios.get(`http://localhost:3001/postComments/${postId}`)
    //   const comments = commentsResponse.data
    //   // Had trouble with state here, and got a solution from ChatGPT. The problem is that I didn't need an array of comments like I thought, because each postId has comments that are assigned to it. This means that we need to hold the postId and the array of its comments as a pair in an object like this: { postId1: [{comment1}, {comment2}], postId2: [{comment1}] } Therefore, we need to make sure that each unique postId is added to the object without replacing the previous postId's.
    //   setPostComments(prevState => ({
    //     ...prevState,
    //     [postId]: comments
    //   }))
    // }
    // getPostComments()

  }, [username])

  // const createNewPost = async (content) => {
  //   const newPost = {
  //     user_id: activeUser._id, 
  //     content: content,
  //     created_at: new Date(),
  //     likes: 0
  //   }

  //   const response = await axios.post(`http://localhost:3001/posts`, newPost)
  //   setPosts([response.data.newObject, ...posts])
  // }

  // const handleSubmitPost = (e) => {
  //   e.preventDefault()
  //   createNewPost(postText)
  //   setPostText('')
  // }

  // const handleRemovePost = async (postId) => {
  //   await axios.delete(`http://localhost:3001/posts/${postId}`)
  //   setPosts(posts.filter(post => post._id !== postId))
  // }

  // const handleToggleLike = async (postId) => {
    // const response = await axios.put(`http://localhost:3001/users/${activeUser._id}/likes/${postId}`)
    // const updatedPost = response.data

    // I need to update the local state of posts to reflect the new amount of likes
    // Had to get help with this line. I didn't realize that you could use .map insie of your setter function, so that is really helpful to know. This is now a more robust way of ensuring that we are selecting the correct post._id in our posts array, and updating it to the new status after our put request has been made.
    // setPosts(posts.map(post => 
    //   post._id === postId ? updatedPost : post
    // ))
  
    // I need to update the likedPosts of the activeUser in the local state
    // if (activeUser.likedPosts.includes(postId)) {
    //   activeUser.likedPosts = activeUser.likedPosts.filter(id => id !== postId)
    // } else {
    //   activeUser.likedPosts.push(postId)
    // }
  // }
  
  return (
    <div className='userProfile'>
      <Header/>
      <div className='aboutUser'>
        <h2>About {viewedUser.firstname}</h2>
        <h3>{viewedUser.age} Years Old</h3>
        <h3>Lives in {viewedUser.location}</h3>
      </div>
      {/* <form className='createPost' onSubmit={handleSubmitPost}>
        <input 
          type="textarea"
          value={postText} 
          onChange={(e) => setPostText(e.target.value)}
          placeholder='Write your next post here'
        />
        <button className='postButton' type='submit'>Post</button>
      </form> */}

      {/* <div className='posts'>
        {posts.map(post => (
            <div className='post' key={post._id}>
              <h4 className='postData'>{new Date(post.created_at).toLocaleString()}</h4>
              <h4 className='postContent'>{post.content}</h4>
              <h4 className='postLikes'>Likes: {post.likes}</h4>
              <button className='likePostButton' onClick={() => handleToggleLike(post._id)}>Like</button>
              <button className='editPostButton'>Edit</button>
              <button className='removePostButton' onClick={() => handleRemovePost(post._id)}>Remove</button>
              <div className='comments'>
              {postComments[post._id]?.map(comment => (
                <div className='comment' key={comment._id}>
                  <img className='commentUserImg' src={comment.user_id.profilePicURL}/>
                  <p className='commentUsername'>{`${comment.user_id.firstname} ${comment.user_id.lastname}`}</p>
                  <p className='commentContent'>{comment.content}</p>
                  <p className='commentData'>{new Date(comment.created_at).toLocaleString()}</p>
                  <p className='commentLikes'>Likes: {comment.likes}</p>
                </div>
              ))}
            </div>
            </div>
          ))}
      </div> */}
      
    </div>
  )
}