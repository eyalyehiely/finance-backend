import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import fetchSavingsData from '../../functions/savings/fetchSavingsData'
import addSaving from '../../functions/savings/addSaving';

function AddSaving() {
  const [show, setShow] = useState(false);
  const [savings, setSavings] = useState([]);
  const [data, setData] = useState({
    saving_type: '',
    amount: '',
    interest: '',
    starting_date: '',
    finish_date: '',
  });

  const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;

  useEffect(() => {
    if (token) {
      fetchSavingsData(token, setSavings);
    }
  }, [token]);

  const handleClose = () => {
    setShow(false);
    setData({
      saving_type: '',
      amount: '',
      interest: '',
      starting_date: '',
      finish_date: '',
    });
  };

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addSaving(token, setSavings, data, handleClose);
  };

  return (
    <>
      <Button onClick={handleShow} variant="outline-primary">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
          </svg>
        </span>
      </Button>

      <Modal show={show} onHide={handleClose} centered dir="rtl">
        <Modal.Header>
          <Modal.Title>פרטי חסכון</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formSavingType">
              <Form.Label>סוג הכנסה</Form.Label>
              <Form.Control
                as="select"
                name="saving_type"
                value={data.saving_type}
                onChange={handleChange}
                required
              >
                <option value=""></option>
                <option value="health">בריאות</option>
                <option value="business">עסקים</option>
                <option value="regular">רגיל</option>
                <option value="education">השכלה</option>
                <option value="other">אחר</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formAmount">
              <Form.Label>סכום</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={data.amount}
                onChange={handleChange}
                required
              />
            </Form.Group>


            <Form.Group controlId="formInterest">
              <Form.Label>ריבית</Form.Label>
              <Form.Control
                type="number"
                name="interest"
                value={data.interest}
                onChange={handleChange}
                required
              />
            </Form.Group>


            <Form.Group controlId="formStartingData">
              <Form.Label>תאריך התחלה</Form.Label>
              <Form.Control
                type="date"
                name="starting_date"
                value={data.starting_date}
                onChange={handleChange}
                required
              />
            </Form.Group>


            <Form.Group controlId="formFinishData">
              <Form.Label>תאריך סיום</Form.Label>
              <Form.Control
                type="date"
                name="finish_date"
                value={data.finish_date}
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

export default AddSaving;
