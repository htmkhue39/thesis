import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountHeader from './AccountHeader';
import Header from '../components/Header';
import './Homepage.css'

function SwapCoin() {
    return (
        <div className='app-content-wrapper'>
            <div className='app-content'>
                <Header />
                <AccountHeader
                    selectedAccount={selectedAccount}
                    setShowAccountSelector={setShowAccountSelector}
                    truncateAddress={truncateAddress}
                    copyAddress={copyAddress}
                />
            </div>
        </div>
    );
}

export default SwapCoin;