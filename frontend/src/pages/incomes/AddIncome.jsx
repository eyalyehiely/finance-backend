import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import fetchIncomesData from '../../functions/incomes/fetchIncomesData';
import addIncome from '../../functions/incomes/addIncome';

function AddIncome() {
  const [show, setShow] = useState(false);
  const [incomes, setIncomes] = useState([]);
  const [data, setData] = useState({
    source: '',
    amount: '',
    date: '',
  });

  const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;

  useEffect(() => {
    if (token) {
      fetchIncomesData(token, setIncomes);
    }
  }, [token]);

  const handleClose = () => {
    setShow(false);
    setData({
      source: '',
      amount: '',
      date: '',
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
    addIncome(token, setIncomes, data, handleClose);
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
          <Modal.Title>פרטי הכנסה</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formSource">
              <Form.Label>סוג הכנסה</Form.Label>
              <Form.Control
                as="select"
                name="source"
                value={data.source}
                onChange={handleChange}
                required
              >
                <option value=""></option>
                <option value="salary">משכורת</option>
                <option value="allowance">קצבה</option>
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

            <Form.Group controlId="formDate">
              <Form.Label>תאריך</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={data.date}
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

export default AddIncome;
