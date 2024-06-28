import React from 'react';
import { useNavigate } from 'react-router-dom';





function LogOut() {
  localStorage.removeItem('authToken')
 return(
  nevigate('/')
 )
}

export  default LogOut