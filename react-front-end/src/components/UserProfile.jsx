import { useEffect, useState } from 'react'
import Header from './Header'
import { useParams, useNavigate } from 'react-router-dom'
import profileImg from '../assets/profileImg.png'
import axios from 'axios'
import '../component-style/profile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faHeart, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons'

export default function UserProfile () {
  
  const [viewedUser, setViewedUser] = useState({})
  const [activeUser, setActiveUser] = useState({})
  const [posts, setPosts] = useState([])
  const [postText, setPostText] = useState('')
  const [postComments, setPostComments] = useState({})
  const [commentText, setCommentText] = useState({})
  const [commentFormVisible, setCommentFormVisible] = useState({})
  const { username } = useParams()
  const navigate = useNavigate()
  const loggedInUser = localStorage.getItem('loggedInUser')

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/')
      return
    }

    const fetchData = async () => {
      try {
        const getViewedUserResponse = axios.get(`http://localhost:3001/users/usernames/${username}`)
        const getLoggedInUserResponse = axios.get(`http://localhost:3001/users/${loggedInUser}`)
        const getUserPostsResponse = axios.get(`http://localhost:3001/userPosts/${username}`)

        // Goodness gracious, the asynchronous nature of React can be such a headache. Took about 2 hours of research to find this solution of Promise.all. ChatGPT also simplified my code while helping me try to deal with this, so that's cool I guess. 
        const [viewedUserResponse, loggedInUserResponse, userPostsResponse] = await Promise.all([
          getViewedUserResponse,
          getLoggedInUserResponse,
          getUserPostsResponse
        ])

        setViewedUser(viewedUserResponse.data)
        setActiveUser(loggedInUserResponse.data)
        // console.log(loggedInUserResponse.data)
        setPosts(userPostsResponse.data)

        userPostsResponse.data.forEach(post => {
          getPostComments(post._id)
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    if (loggedInUser) {
      fetchData()
    }
  }, [username, loggedInUser, navigate])
  
  const getPostComments = async (postId) => {
    try {
      const commentsResponse = await axios.get(`http://localhost:3001/postComments/${postId}`)
      const comments = commentsResponse.data

      // Had trouble with state here, and got a solution from ChatGPT. The problem is that I didn't need an array of comments like I thought, because each postId has comments that are assigned to it. This means that we need to hold the postId and the array of its comments as a pair in an object like this: { postId1: [{comment1}, {comment2}], postId2: [{comment1}] } Therefore, we need to make sure that each unique postId is added to the object without replacing the previous postId's.
      setPostComments(prevState => ({
        ...prevState,
        [postId]: comments
      }))
    } catch (error) {
      console.error('Error fetching post comments:', error)
    }
  }

  const createNewPost = async (content) => {
    const newPost = {
      user_id: activeUser._id, 
      content: content,
      created_at: new Date(),
      likes: 0
    }

    const response = await axios.post(`http://localhost:3001/posts`, newPost)
    setPosts([response.data.newObject, ...posts])
  }

  const handleSubmitPost = (e) => {
    e.preventDefault()
    if (!postText || postText.trim() === '') {
      alert('Please input a post before submitting')
      return
    }
    createNewPost(postText)
    setPostText('')
  }

  const handleCommentOnPost = async (postId, commentContent, e) => {
    if(e) {
      e.preventDefault()
    }

    // This is to avoid console errors when a comment is submitted with no value
    if (!commentContent || commentContent.trim() === '') {
      alert('Please input a comment before submitting')
      return
    }
    
    const newComment = {
      user_id: activeUser._id,
      post_id: postId,
      created_at: new Date(),
      content: commentContent,
      likes: 0
    }

    const response = await axios.post(`http://localhost:3001/comments`, newComment)
    // Needed a lot of help with state again, so had to refer to ChatGPT. This was really confusing to me, but I'm starting to understand how previous state works. The state setter function in the useState hook takes a function as an argument that automatically recieves the previous state (I named it 'prevState' here). Using a spread operator on the previous state ensures that we do not lose any existing state properties, which is important in asynchronous operations like this one. ChatGPT says "React state should be updated 'immutably'. This means we should not directly modify the existing state but instead create a new state object with the necessary updates.""
    setPostComments(prevState => ({
      ...prevState,
      // I was running into an issue of the spread operator of prevState being undefined. ChatGPT showed me hat we can use an or statement to handle that.
      [postId]: [...(prevState[postId] || []), response.data]
    }))
    setCommentText(prevState => ({
      ...prevState,
      [postId]: ''
    }))
    setCommentFormVisible(prevState => ({
      ...prevState,
      [postId]: false
    }))
  }

  const handleRemovePost = async (postId) => {
    await axios.delete(`http://localhost:3001/posts/${postId}`)
    setPosts(posts.filter(post => post._id !== postId))
  }

  const handleRemoveComment = async (commentId, postId) => {
    await axios.delete(`http://localhost:3001/comments/${commentId}`);
    setPostComments(prevState => ({
      ...prevState,
      [postId]: prevState[postId].filter(comment => comment._id !== commentId)
    }))
  }

  const handleToggleLikePost = async (postId) => {
    // console.log(activeUser._id)
    const response = await axios.put(`http://localhost:3001/users/${activeUser._id}/postLikes/${postId}`)
    const updatedPost = response.data

    // I need to update the local state of posts to reflect the new amount of likes
    // Had to get help with this line. I didn't realize that you could use .map insie of your setter function, so that is really helpful to know. This is now a more robust way of ensuring that we are selecting the correct post._id in our posts array, and updating it to the new status after our put request has been made.
    setPosts(posts.map(post => 
      post._id === postId ? updatedPost : post
    ))
  
    // I need to update the likedPosts of the activeUser in the local state
    if (activeUser.likedPosts.includes(postId)) {
      activeUser.likedPosts = activeUser.likedPosts.filter(id => id !== postId)
    } else {
      activeUser.likedPosts.push(postId)
    }
  }

  const handleToggleLikeComment = async (commentId, postId) => {
    try {
      const response = await axios.put(`http://localhost:3001/users/${loggedInUser}/commentLikes/${commentId}`)
      const updatedComment = response.data.comment
      // console.log(updatedComment)

      // This was tricky because postComments is a object where eah key is a postId and its value is an array of comments, meaning I couldn't simply map over the array like I did for posts. My brain broke, and there was no way I could have figured this out on my own given my current knowledge, so this is almost straight from ChatGPT. I can understand that we are needing to map over each comment in order to find the one with the correct comment._id, and then update it's local state to the state after the axios call. However, I need to learn the syntax of accessing this postComments object in the correct way, as ChatGPT helped me with here.
      setPostComments(prevState => ({
        ...prevState,
        [postId]: prevState[postId].map(comment =>
          // Had to add additional logic to ensure the comment maintains it's user_id
            comment._id === commentId ? { ...comment, ...updatedComment, user_id: comment.user_id } : comment
        )
      }))

      setActiveUser(prevState => {
        const likedComments = prevState.likedComments.includes(commentId)
            ? prevState.likedComments.filter(id => id !== commentId)
            : [...prevState.likedComments, commentId]
        return {
            ...prevState,
            likedComments
        }
      })
    } catch (error) {
        console.error('Error toggling like comment:', error);
    }
  }

  const sendFriendRequest = async (requestUserId) => {
    try {
      const response = await axios.put(`http://localhost:3001/users/${loggedInUser}/sendFriendRequest/${requestUserId}`)
      console.log(response.data)
      setViewedUser(response.data)
    } catch (error) {
      console.error('Error sending friend request:', error)
    }
  }

  const unfriend = async (friendUserId) => {
    try {
        const response = await axios.put(`http://localhost:3001/users/${loggedInUser}/unfriend/${friendUserId}`)
        console.log(response.data)
        setActiveUser(response.data.loggedIn)
    } catch (error) {
        console.error('Error unfriending:', error)
    }
  }

  const cancelFriendRequest = async (friendUserId) => {
    try {
        const response = await axios.put(`http://localhost:3001/users/${loggedInUser}/cancelFriendRequest/${friendUserId}`)
        // console.log(response.data)
        setViewedUser(response.data.requestedFriend)
    } catch (error) {
        console.error('Error unfriending:', error)
    }
  }

  const renderFriendButton = () => {
    if (activeUser.username === viewedUser.username) {
        return null
    }
  // This fixed an issue where activeUser.friendsList was undefined sometimes after pressing the button
    const friendsList = activeUser.friendsList || []
    const friendRequests = viewedUser.friendRequests || []

    if (friendsList.includes(viewedUser._id)) {
        return <button className='addFriend' onClick={() => unfriend(viewedUser._id)}>Unfriend</button>
    }

    if (friendRequests.includes(activeUser._id)) {
        return <button className='addFriend' onClick={() => cancelFriendRequest(viewedUser._id)}>Cancel Friend Request</button>
    }

    return <button className='addFriend' onClick={() => sendFriendRequest(viewedUser._id)}>Add Friend</button>
  }

  const navigateToUser = (username) => {
    navigate(`/username/${username}`)
  }
  
  return (
    <div className='userProfile'>
      <Header activeUser = {activeUser}/>

      {renderFriendButton()}

      <div className='aboutUser'>
        <img className="profileImage" src={profileImg} alt="Profile Image" width={150} />
        <div className="userInfo">
          <h2 >{viewedUser.firstname} {viewedUser.lastname}</h2>
          <h3>Software Engineer</h3>
          <h3>Age {viewedUser.age}</h3>
          <h3>{viewedUser.location}</h3>
        </div>
      </div>

      {/* Only show createNewPost form if viewing your own page */}
      <div className="postSection">
      {activeUser.username === viewedUser.username && (
        <form className='createPost' onSubmit={handleSubmitPost}>
          <textarea 
            rows="4"
            cols="40"
            value={postText} 
            onChange={(e) => setPostText(e.target.value)}
            placeholder='Write your next post here'
          />
          <button className='postBtn' type='submit'>Post  <FontAwesomeIcon icon={faPenToSquare} /></button>
        </form>
      )}
        
      {/* Map all of the posts for the viewedUser */}
      <div className='posts'>
        {posts.map(post => (
            <div className='post' key={post._id}>
              
              <h4 className='postContent'>{post.content}</h4>
              <h4 className='postLikes'>Likes: {post.likes}</h4>
              <h4 className='postData'>{new Date(post.created_at).toLocaleString()}</h4>
              <button className='likePostButton' onClick={() => handleToggleLikePost(post._id)}><FontAwesomeIcon icon={faHeart} /></button>
              
              {/* <button className='editPostButton'>Edit</button> */}
              
              {/* Only show the remove post option if viewing your own post */}
              {activeUser._id === post.user_id && (
                <button className='removePostButton' onClick={() => handleRemovePost(post._id)}><FontAwesomeIcon icon={faTrashCan} /></button>
              )}
                
              {/* Only show the comment form if the comment button has been clicked. Otherwise, show the comment button */}
              {commentFormVisible[post._id] ? (
                <form>
                  <input className='replyPost'
                    type="text"
                    value={commentText[post._id] || ''}
                    onChange={(e) => setCommentText({
                      ...commentText,
                      [post._id]: e.target.value
                    })}
                    placeholder='Write a comment'
                  />
                  <button className='submitCommentButton' onClick={() => handleCommentOnPost(post._id, commentText[post._id])}>Reply <FontAwesomeIcon icon={faPenToSquare} /></button>
                  <button className='cancelCommentButton' onClick={() => setCommentFormVisible({
                    ...commentFormVisible,
                    [post._id]: false
                  })}><FontAwesomeIcon icon={faXmark} /></button>
                  
                </form>
              ) : (
                <button className='commentButton' onClick={() => setCommentFormVisible({
                  ...commentFormVisible,
                  [post._id]: true
                })}>Reply <FontAwesomeIcon icon={faPenToSquare} /></button>
                
              )}
              
              {/* Map all of the comments for each post */}
              <div className='comments'>

              {postComments[post._id]?.map(comment => (
                <div className='comment' key={comment._id}>
                  {/* <img className='commentUserImg' src={comment.user_id.profilePicURL}/> */}
                  <p className='commentUsername' onClick={() => navigateToUser(comment.user_id.username)}>{`${comment.user_id.username}`}</p>
                  <p className='commentContent'>{comment.content}</p>
                  <p className='commentData'>{new Date(comment.created_at).toLocaleString()}</p>
                  <p className='commentLikes'>Likes: {comment.likes}</p>
                  <button className='likeCommentButton' onClick={() => handleToggleLikeComment(comment._id, post._id)}>Like</button>
                  {/* <button className='editCommentButton'>Edit</button> */}

                    {/* Only show the remove comment option if it is the logged in user's comment */}
                    {comment.user_id._id === activeUser._id && (
                      <button className="removeLikeCommentBtn" onClick={() => handleRemoveComment(comment._id, post._id)}><FontAwesomeIcon icon={faTrashCan} /></button>
                    )}
                  </div>
                ))}
                
              </div>
              
          </div>
        ))}
      </div>
      </div>
      
    </div>
  )
}