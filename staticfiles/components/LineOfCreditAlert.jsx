import React from 'react';

function LineOfCreditAlert({ amountToCharge, lineOfCredit }) {
  const alertMessage = amountToCharge >= lineOfCredit * 0.75 ? 'הנך קרוב למסגרת האשראי שלך ' : '';

  return (
    <div>
      {alertMessage}
    </div>
  );
}

export default LineOfCreditAlert;
