import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import fetchDebtData from '../../functions/debts/fetchDebtData';
import addDebtData from '../../functions/debts/addDebtData';

function AddDebt() {
  const [show, setShow] = useState(false);
  const [debts, setDebts] = useState([]);
  const [data, setData] = useState({
    name: '',
    amount: '',
    line_of_debt: '',
    starting_date: '',
    interest: '',
    finish_date: '',
    type: '', // Adding type to the initial state
  });

  const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;

  useEffect(() => {
    if (token) {
      fetchDebtData(token, setDebts);
    }
  }, [token]);

  const handleClose = () => {
    setShow(false);
    setData({
      name: '',
      amount: '',
      line_of_debt: '',
      interest: '',
      starting_date: '',
      finish_date: '',
      type: '', 
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
    addDebtData(token, setDebts, data, handleClose);
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
          <Modal.Title>פרטי החוב</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formType">
              <Form.Label>סוג החוב</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={data.type}
                onChange={handleChange}
                required
              >
                <option value=""></option>
                <option value="mortgage">משכנתא</option>
                <option value="government">ממשלתית</option>
                <option value="loan">הלוואה</option>
                <option value="business">עסק</option>
                <option value="medical">רפואי</option>
                <option value="car">משכון רכב</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formDebtName">
              <Form.Label>שם החוב</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAmount">
              <Form.Label>סכום החוב</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={data.amount}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formLineOfDebt">
              <Form.Label>מסגרת החוב</Form.Label>
              <Form.Control
                type="number"
                name="line_of_debt"
                value={data.line_of_debt}
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

            <Form.Group controlId="formStartingDate">
              <Form.Label>תאריך התחלה</Form.Label>
              <Form.Control
                type="date"
                name="starting_date"
                value={data.starting_date}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formFinishDate">
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

export default AddDebt;
