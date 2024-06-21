import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import getCurrentUserData from '../../functions/users/getCurrentUserData';
import updateUser from '../../functions/users/updateUser';

function EditUser({ card }) {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    life_status: '',
    num_of_children: '',
    phone_number: '',
    birth_date: '',
    profession: '',
    address: '',
  });

  const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;

  useEffect(() => {
    if (token) {
      getCurrentUserData(token, setUser);
    }
  }, [token]);

  const handleClose = () => {
    setShow(false);
    setData({
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      email: user.email || '',
      gender: user.gender || '',
      life_status: user.life_status || '',
      num_of_children: user.num_of_children || '',
      phone_number: user.phone_number || '',
      birth_date: user.birth_date || '',
      profession: user.profession || '',
      address: user.address || '',
    });
  };

  const handleShow = () => {
    setShow(true);
    setData({
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      email: user.email || '',
      gender: user.gender || '',
      life_status: user.life_status || '',
      num_of_children: user.num_of_children || '',
      phone_number: user.phone_number || '',
      birth_date: user.birth_date || '',
      profession: user.profession || '',
      address: user.address || '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(token, setUser, data, handleClose);
  };

  return (
    <>
        <Button onClick={handleShow} variant="primary" className="d-flex align-items-center">
            <span className="ml-2">עריכה</span>
            <svg className="w-4 h-4 text-slate-500 dark:text-slate-400" viewBox="0 0 16 16">
                <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
            </svg>
        </Button>


      <Modal show={show} onHide={handleClose} centered dir="rtl">
        <Modal.Header>
          <Modal.Title>פרטי חשבון</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Label>שם פרטי</Form.Label>
              <Form.Control
                type="input"
                name="first_name"
                value={data.first_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>שם משפחה</Form.Label>
              <Form.Control
                type="input"
                name="last_name"
                value={data.last_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>אימייל</Form.Label>
              <Form.Control
                type="input"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formGender">
              <Form.Label>מגדר</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={data.gender}
                onChange={handleChange}
                required
                >
                <option value={data.gender}>{data.gender}</option>
                <option value="female">נקבה</option>
                <option value="male">זכר</option>
                <option value="other">אחר</option>
            </Form.Control>
              
            </Form.Group>
            
            <Form.Group controlId="formLifeStatus">
              <Form.Label>סטטוס</Form.Label>
              <Form.Control
                as="select"
                name="life_status"
                value={data.life_status}
                onChange={handleChange}
                required
              >
                <option value={data.life_status}>{data.life_status}</option>
                <option value="single">רווק/ה</option>
                <option value="marriage">נשוי/ה</option>
                <option value="divorce">גרוש/ה</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formNumChildren">
              <Form.Label>מספר ילדים</Form.Label>
              <Form.Control
                type="number"
                name="num_of_children"
                value={data.num_of_children}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhoneNumber">
              <Form.Label>מספר טלפון</Form.Label>
              <Form.Control
                type="input"
                name="phone_number"
                value={data.phone_number}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBirthDate">
              <Form.Label>תאריך לידה</Form.Label>
              <Form.Control
                type="input"
                name="birth_date"
                value={data.birth_date}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formProfession">
              <Form.Label>מקצוע</Form.Label>
              <Form.Control
                type="input"
                name="profession"
                value={data.profession}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>כתובת</Form.Label>
              <Form.Control
                type="input"
                name="address"
                value={data.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Button variant="success" type="submit" className="mt-3">
              שמור
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            סגור
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditUser;
