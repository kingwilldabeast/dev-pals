import { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function FriendsList () {
  
  const [friends, setFriends] = useState([])
  const [friendRequests, setFriendRequests] = useState([])
  const loggedInUser = localStorage.getItem('loggedInUser')
  const navigate = useNavigate()

  useEffect(() => {
    const getFriends = async () => {
      const userResponse = await axios.get(`http://localhost:3001/users/friends/${loggedInUser}`)
      setFriends(userResponse.data.friendsList)
      setFriendRequests(userResponse.data.friendRequests)
    }
    if (loggedInUser) {
      getFriends()
    } else {
      navigate('/')
      return
    }
  }, [loggedInUser, navigate])
  // console.log(friends)

  const acceptFriendRequest = async (requestingUserId) => {
    try {
        const response = await axios.put(`http://localhost:3001/users/${loggedInUser}/acceptFriendRequest/${requestingUserId}`)
        console.log(response.data.loggedIn)
        setFriends(response.data.loggedIn.friendsList)
        setFriendRequests(response.data.loggedIn.friendRequests)
    } catch (error) {
        console.error('Error accepting friend request:', error)
    }
  }

  return (
    <div className='friendsPage'>
      <Header/>
      <div className='friendRequests'>
        <h1>Friend Requests</h1>
        {/* handle case when user has no friend requests */}
        {friendRequests.length === 0 ? (
          <h3>No Friend Requests</h3>
        ) : (
          friendRequests.map(request => (
            <div className='friendRequest' key={request._id}>
              <Link to={`/username/${request.username}`}>
                <div>
                  {/* <img className='friendRequestImg' src={request.profilePicURL}/> */}
                  <h2>{request.username}</h2>
                </div>
              </Link>
              <button className='acceptRequest' onClick={() => acceptFriendRequest(request._id)}>Accept</button>
            </div>
          ))
        )}
      </div>
      <div className='friendsList'>
      <h1>Friends</h1>
        {/* handle case when user has no friends :( */}
        {friends.length === 0 ? (
          <h1>Add friends to see them here!</h1>
        ) : (
          friends.map(friend => (
            <Link key={friend._id} to={`/username/${friend.username}`}>
              <div className='friend'>
                {/* <img className='friendImg' src={friend.profilePicURL}/> */}
                <h2>{friend.username}</h2>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}