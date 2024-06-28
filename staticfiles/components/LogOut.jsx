import React from "react";
import axios from "axios";

function LogoutButton(){
    
    try {
        localStorage.removeItem('authTokens')
        axios.get('http://localhost:8000/api/auth/logout/'),{} // Adjust URL as per your Django backend
        console.log('User logged out successfully.');
        
    } catch (error) {
        console.error('Logout failed:', error);
    }
    

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;