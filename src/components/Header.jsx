import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import './Header.css'

export default function Header() {
    const navigate = useNavigate(); 
    
    const handleBacktoHomepage = () => {
        console.log('backto homepage');
        navigate("/homepage")
      };

    return (
        <div className='app-header'>
            <button className='logo-button' onClick={handleBacktoHomepage}>
                <img src={logo} alt="Logo" className='logobar' />
                <p className='header-title'>Wallet</p>
            </button>
        </div>
    )
}