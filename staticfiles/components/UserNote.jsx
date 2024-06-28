import React from 'react';

function Note() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  let greeting;

  if (currentHour >= 5 && currentHour < 12) {
    greeting = 'בוקר טוב';
  } else if (currentHour >= 12 && currentHour < 16) {
    greeting = 'צהריים טובים';
  
  } else if (currentHour >= 16 && currentHour < 19) {
      greeting = 'אחר הצהריים טובים';
  
  } else if (currentHour >= 19 && currentHour < 21) {
    greeting = 'ערב טוב';
    
  
  } else  {
    greeting = 'לילה טוב';
  }

  return (
    <div>
      <h1>{greeting}</h1>
    </div>
  );
}

export default Note;
