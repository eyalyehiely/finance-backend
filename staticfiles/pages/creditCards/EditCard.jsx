import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import getCreditCardData from '../../functions/credit_cards/getCreditCardData';
import updateCreditCard from '../../functions/credit_cards/updateCreditCard';


function EditCard({ card }) {
  const [show, setShow] = useState(false);
  const [creditCards, setCreditCards] = useState([]);
  const [editingCardId, setEditingCardId] = useState(null);
  const [data, setData] = useState({
    name: '',
    line_of_credit: '',
    status: '',
    credit_type: '',
    last_four_digits: '',
  });

  const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;

  useEffect(() => {
    if (token) {
      getCreditCardData(token, setCreditCards);
    }
  }, [token]);

  const handleClose = () => {
    setShow(false);
    setData({
      name: '',
      line_of_credit: '',
      status: '',
      credit_type: '',
      last_four_digits: '',
    });
    setEditingCardId(null);
  };

  const handleShow = () => {
    setEditingCardId(card.id);
    setData({
      name: card.name,
      line_of_credit: card.line_of_credit,
      status: card.status,
      credit_type: card.credit_type,
      last_four_digits: card.last_four_digits,
    });
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCreditCard(token, setCreditCards, editingCardId, data, handleClose);
  };

  return (
    <>
      <Button onClick={handleShow} variant="warning" className="d-flex align-items-center">
            <span className="ml-2">עריכה</span>
            <svg className="w-4 h-4 text-slate-500 dark:text-slate-400" viewBox="0 0 16 16">
                <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
            </svg>
      </Button>

      <Modal show={show} onHide={handleClose} centered dir="rtl">
        <Modal.Header>
          <Modal.Title>פרטי כרטיס האשראי</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCardName">
              <Form.Label>שם הכרטיס</Form.Label>
              <Form.Control
                as="select"
                name="name"
                value={data.name}
                onChange={handleChange}
              >
                <option value="Visa">Visa</option>
                <option value="Mastercard">Mastercard</option>
                <option value="American Express">American Express</option>
                <option value="Diners">Diners</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formCreditType">
              <Form.Label>סוג הכרטיס</Form.Label>
              <Form.Control
                as="select"
                name="credit_type"
                value={data.credit_type}
                onChange={handleChange}
              >
                <option value="debit">debit</option>
                <option value="credit">credit</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formStatus">
              <Form.Label>סטטוס</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={data.status}
                onChange={handleChange}
              >
                <option value="Active">פעיל</option>
                <option value="Blocked">מושבת</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formCreditLimit">
              <Form.Label>מסגרת אשראי</Form.Label>
              <Form.Control
                type="input"
                name="line_of_credit"
                value={data.line_of_credit}
                onChange={handleChange}
              />
            </Form.Group>
            
            <Form.Group controlId="formLastFourDigits">
              <Form.Label>4 ספרות אחרונות</Form.Label>
              <Form.Control
                type="input"
                name="last_four_digits"
                value={data.last_four_digits}
                onChange={handleChange}
                maxLength={4}
                minLength={4}
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

export default EditCard;
