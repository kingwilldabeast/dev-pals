import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';


function SignupModal({ show, handleClose }) {
  const [formState, setFormState] = useState({
    firstname: '',
    lastname: '',
    age: '',
    bio: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {

    if(!formState.firstname || !formState.lastname) {
      alert(`Please Enter First and Last name`)
      return
    }

    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formState);
    handleClose();
    navigate(`/username/${formState.username}`)
  };

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
          <Button variant="primary" type="submit">
            Go to Profile
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default SignupModal;
