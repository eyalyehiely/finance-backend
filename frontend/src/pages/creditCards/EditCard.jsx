import React from 'react';
import PropTypes from 'prop-types';
// import CreditCardLogo from './CreditCardLogo'; // Assuming you have a CreditCardLogo component

const EditCard = ({ card, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-auto relative overflow-hidden shadow-lg transform scale-0 opacity-0 transition-all duration-300">
        <button
          className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center justify-between mb-4">
          {/* <CreditCardLogo cardType={card.card_type} className="w-10 h-6" /> */}

          <div className="text-gray-600 text-sm">
            <span>סופר: {card.last4}</span>
          </div>
        </div>

        <form className="space-y-4">
          {/* Form fields for editing card details */}
          {/* Example: */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700" htmlFor="name">
              שם בעל הכרטיס
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="border border-gray-300 rounded-md shadow-sm focus:ring-slate-500 focus:border-slate-500 block w-full sm:text-sm"
              defaultValue={card.card_name}
            />
          </div>

          {/* Add more form fields for other details like expiration date, CVV, etc. */}
        </form>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-md focus:outline-none"
            onClick={onClose}
          >
            שמור שינויים
          </button>
        </div>
      </div>
    </div>
  );
};

EditCard.propTypes = {
  card: PropTypes.object.isRequired, // Assuming card is an object with necessary details
  onClose: PropTypes.func.isRequired, // Function to close the flying card
};

export default EditCard;
