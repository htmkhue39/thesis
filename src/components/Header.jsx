import React from 'react';
import logo from '../assets/logo.jpg';
import './Header.css'

export default function Header() {
    return (
        <div className='app-header'>
            <button className='logo-button'>
                <img src={logo} alt="Logo" className='logobar' />
                <p className='header-title'>Wallet</p>
            </button>
        </div>
    )
}