import { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function FriendsList () {
  
  const [friends, setFriends] = useState([])
  const loggedInUser = localStorage.getItem('loggedInUser')
  const navigate = useNavigate()

  useEffect(() => {
    const getFriends = async () => {
      const userResponse = await axios.get(`http://localhost:3001/users/friends/${loggedInUser}`)
      setFriends(userResponse.data.friendsList)
    }
    if (loggedInUser) {
      getFriends()
    } else {
      navigate('/')
      return
    }
  }, [loggedInUser])
  // console.log(friends)

  // const addFriend = async (userId) => {
  //   try {
  //       const response = await axios.put(`http://localhost:3001/users/${loggedInUser}/addFriend/${userId}`)
  //       console.log(response.data)
  //   } catch (error) {
  //       console.error('Error adding friend:', error)
  //   }
  // }

  return (
    <div className='friendsPage'>
      <Header/>
      {/* handle case when user has no friend requests */}
      <div className='friendsList'>
        {/* handle case when user has no friends :( */}
        {friends.length === 0 ? (
          <h1>Add friends to see them here!</h1>
        ) : (
          friends.map(friend => (
            <Link key={friend._id} to={`/username/${friend.username}`}>
              <div className='friend' key={friend._id}>
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

// {/* <div className='friendRequests'>
//         {friendRequests.length === 0 ? (
//           <h1>No Friend Requests</h1>
//         ) : (
//           friendRequests.map(request => (
//             <div className='friendRequest' key={request._id}>
//               <Link key={request._id} to={`/username/${request.username}`}>
//                 <div>
//                   {/* <img className='friendRequestImg' src={request.profilePicURL}/> */}
//                   <h2>{request.username}</h2>
//                 </div>
//               </Link>
//               <button className='acceptRequest' onClick={() => addFriend(request._id)}>Accept</button>
//             </div>
//           ))
//         )}
//       </div> */}