import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function GetStartedModal({ show, handleClose }) {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('loggedInUser')

  const [formState, setFormState] = useState({
    firstname: '',
    lastname: '',
    age: '',
    bio: ''
  });

  useEffect(() => {
    
    const getUsername = async () => {
      if (loggedInUser) {
        try {
          const response = await axios.get(`http://localhost:3001/users/${loggedInUser}`)
          setUsername(response.data.username)
        } catch (error) {
          console.error('Error fetching username:', error)
        }
      }
    };
      getUsername()
  }, [loggedInUser])

    // console.log(username)
        
    const handleChange = (e) => {
      setFormState({ ...formState, [e.target.id]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if(!formState.firstname || !formState.lastname) {
        alert(`Please Enter First and Last name`)
        return
      }
      console.log('Form submitted:', formState);

      const updateNewAccount = async () => {
 
        try {
          const response = await axios.put(`http://localhost:3001/users/${loggedInUser}`, {
            firstname: formState.firstname,
            lastname: formState.lastname,
            age: formState.age,
            bio: formState.bio
          }, {
         
          });
     
            console.log(`users are ${response.data}`)
     
        } catch (error) {
          console.error("Error:", error)
        }
      
      };
      updateNewAccount()
  
      updateAccount()
      handleClose();
      navigate(`/username/${username}`)
      // window.location.reload()
    };

    const updateAccount = async () => {
      try {
      const response = await axios.put(`http://localhost:3001/users/${loggedInUser}`, {
          firstname: formState.firstname,
          lastname: formState.lastname,
          age: formState.age
      }, {
          headers: {
          "Content-Type": "application/json",
          },
      });
          
          console.log(`users are ${response.data}`)
          if (response.status === 200) {
              console.log("account updated");
          } else {
              console.error("Failed to update account:", response.statusText);
          }
      } catch (error) {
      console.error("Error:", error)
      }
    }

    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Get Started</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="signup-modal-input">
              <label htmlFor="firstname" className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                value={formState.firstname}
                onChange={handleChange}
              />
            </div>
            <div className="signup-modal-input">
              <label htmlFor="lastname" className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                value={formState.lastname}
                onChange={handleChange}
              />
            </div>
            <div className="signup-modal-input">
              <label htmlFor="age" className="form-label">Age</label>
              <input
                type="text"
                className="form-control"
                id="age"
                value={formState.age}
                onChange={handleChange}
              />
            </div>
            <div className="signup-modal-input">
              <label htmlFor="bio" className="form-label">Bio</label>
              <input
                className="form-control"
                id="bio"
                value={formState.bio}
                onChange={handleChange}
                placeholder='Tell us about yourself!'
              />
            </div>
            <button className='gottoprofileBtn' variant="primary" type="submit">
              Go to Profile
            </button>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
  
  export default GetStartedModal;



  // used chatgpt to help with any asynchonous issues and react-bootstrap.netlify for how to use the Modal.
  


