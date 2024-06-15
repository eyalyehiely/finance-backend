import React, { useState } from 'react';
function AddCommaToNumber(number) {
    return (
        number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    )
  }

export  default AddCommaToNumber