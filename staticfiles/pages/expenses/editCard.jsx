import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function EditCreditCardExpenseModal({ showModal, handleClose, handleSave, creditCards, editedExpense, handleEditChange }) {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select Credit Card</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Credit Card</Form.Label>
          <Form.Control
            as="select"
            value={editedExpense.credit_card || ''}
            onChange={(e) => handleEditChange(e, 'credit_card')}
          >
            <option value=""></option>
            {creditCards.map((card) => (
              <option key={card.id} value={card.id}>
                {card.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditCreditCardExpenseModal;
