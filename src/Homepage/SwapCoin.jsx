import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AccountHeader from './AccountHeader';
import Header from '../components/Header';
import { useAccount } from '../AccountContext';

import '../components/Button.css';
import './SwapCoin.css';
import './Homepage.css';

import dropIcon from '../assets/dropdown-icon.svg';
import switchIcon from '../assets/switch.png';
import searchIcon from '../assets/search-icon.svg';

function SwapCoin() {
    const { selectedAccount, handleAccountChange } = useAccount();
    const navigate = useNavigate();
    const [tokens, setTokens] = useState([]);
    const [balances, setBalances] = useState({});
    const [fromToken, setFromToken] = useState({ symbol: 'ETH', logo: '/coin/ethereum.png?url' });
    const [toToken, setToToken] = useState(null);
    const [fromAmount, setFromAmount] = useState(0);
    const [toAmount, setToAmount] = useState(0);
    const [showFromTokenDropdown, setShowFromTokenDropdown] = useState(false);
    const [showToTokenDropdown, setShowToTokenDropdown] = useState(false);
    const [isAmountExceedBalance, setIsAmountExceedBalance] = useState(false);

    useEffect(() => {
        fetchTokens();
    }, []);

    useEffect(() => {
        if (selectedAccount) {
            const accountBalances = {};
            selectedAccount.balances.forEach(balance => {
                accountBalances[balance.token] = balance.amount;
            });
            setBalances(accountBalances);
        }
    }, [selectedAccount]);

    useEffect(() => {
        calculateToAmount();
    }, [fromAmount, fromToken, toToken]);

    const fetchTokens = async () => {
        try {
            const response = await fetch('http://localhost:3001/tokens');
            const data = await response.json();
            setTokens(data);
        } catch (error) {
            console.error('Error fetching tokens:', error);
        }
    };

    const getSwapButtonState = () => {
        if (!fromToken || !toToken) {
            return { disabled: true, text: "Select Token" };
        }
        if (!fromAmount) {
            return { disabled: true, text: "Enter an Amount" };
        }
        if (isAmountExceedBalance) {
            return { disabled: true, text: "Insufficient Balance" };
        }
        return { disabled: false, text: "Swap" };
    };

    const swapButtonState = getSwapButtonState();

    const handleCancel = () => {
        navigate('/homepage');
    };

    const handleTokenSelect = (token, setToken) => {
        setToken(token);
        setShowFromTokenDropdown(false);
        setShowToTokenDropdown(false);
    };

    const handleSwitch = () => {
        const temp = fromToken;
        setFromToken(toToken);
        setToToken(temp);
    };

    const getBalance = (token) => {
        if (!token) return 0;
        return balances[token.symbol] || 0;
    };

    const handleAmountChange = (e) => {
        const value = e.target.value;
        const amount = value === '' ? 0 : Number(value);
        setFromAmount(amount);
        setIsAmountExceedBalance(amount > getBalance(fromToken));
    };

    const calculateToAmount = () => {
        if (!fromToken || !toToken || fromAmount <= 0) {
            setToAmount(0);
            return;
        }

        // AMM logic to calculate toAmount??
        const fromTokenReserve = 10000; // Example reserve value
        const toTokenReserve = 10000; // Example reserve value
        const amountOut = (fromAmount * toTokenReserve) / (fromTokenReserve + fromAmount);
        setToAmount(amountOut.toFixed(4));
    };

    const handleSwap = async () => {
        if (!selectedAccount || !fromToken || !toToken || !fromAmount) {
            return;
        }

        // Perform the swap logic here, like updating balances, etc.
        // Assuming the swap is successful, record the transaction.

        const newTransaction = {
            id: Date.now().toString(),
            address: selectedAccount.address,
            fromToken: fromToken.symbol,
            toToken: toToken.symbol,
            fromAmount: fromAmount,
            toAmount: toAmount,
            date: new Date().toISOString(),
        };

        try {
            const response = await fetch(`http://localhost:3001/accounts/${selectedAccount.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...selectedAccount,
                    transactions: [...selectedAccount.transactions, newTransaction],
                }),
            });

            if (response.ok) {
                handleAccountChange(selectedAccount.name);
                navigate('/homepage');
            } else {
                console.error('Failed to record transaction');
            }
        } catch (error) {
            console.error('Error recording transaction:', error);
        }
    };

    return (
        <div className={`app-content-wrapper ${showFromTokenDropdown || showToTokenDropdown ? 'modal-open' : ''}`}>
            <div className='app-content'>
                <Header />
                {selectedAccount && (
                    <AccountHeader
                        selectedAccount={selectedAccount}
                    />
                )}
                <div className='swap-coin-wrapper'>
                    <div className="swap-coin-content">
                        <div className='swap-coin-header'>
                            <h2 className='title'>Swap</h2>
                            <button className='btn-link' onClick={handleCancel}>Cancel</button>
                        </div>

                        <div className='prepare-swap-wrapper'>
                            <div className='prepare-swap'>
                                <div className='prepare-swap-from'>
                                    <div className='from-token'>
                                        <div className='token-dropdown' onClick={() => setShowFromTokenDropdown(true)}>
                                            <div className='token-list'>
                                                {fromToken && <img src={fromToken.logo} alt={fromToken.symbol} className='token-logo' />}
                                                <span className='swap-token-name'>{fromToken ? fromToken.symbol : 'Select token'}</span>
                                            </div>
                                            <img src={dropIcon} className="dropdown-search" alt="Dropdown" />
                                        </div>
                                        <div className='amount-wrapper'>
                                            <input 
                                                type='number' 
                                                value={fromAmount || 0} 
                                                onChange={handleAmountChange} 
                                                className='amount-input' 
                                            />
                                        </div>
                                    </div>
                                    <div className='balance'>
                                        Balance: {getBalance(fromToken)}
                                    </div>
                                    {isAmountExceedBalance && (
                                        <div className='balance-error'>
                                            Not enough balance
                                        </div>
                                    )}
                                    <div className="btn-switch-container">
                                        <button className="btn-switch" onClick={handleSwitch}>
                                            <img src={switchIcon} className="switch-icon" alt="Swap" />
                                        </button>
                                    </div>
                                </div>
                                <div className='prepare-swap-to'>
                                    <div className='to-token'>
                                        <div className='token-dropdown' onClick={() => setShowToTokenDropdown(true)}>
                                            <div className='token-list'>
                                                {toToken && <img src={toToken.logo} alt={toToken.symbol} className='token-logo' />}
                                                <span className='swap-token-name'>{toToken ? toToken.symbol : 'Select token'}</span>
                                            </div>
                                            <img src={dropIcon} className="dropdown-search" alt="Dropdown" />
                                        </div>
                                        <div className='amount-wrapper'>
                                            <input 
                                                type='number' 
                                                value={toAmount || 0} 
                                                readOnly 
                                                className='amount-input' 
                                            />
                                        </div>
                                    </div>
                                    <div className='balance'>
                                        Balance: {getBalance(toToken)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swap-footer">
                            <footer className='swap-footer-btn'>
                                <button className="btn-primary" disabled={swapButtonState.disabled} onClick={handleSwap}>
                                    {swapButtonState.text}
                                </button>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>

            {(showFromTokenDropdown || showToTokenDropdown) && (
                <div className='modal-overlay'>
                    <div className='token-modal'>
                        <div className='token-modal-content'>
                            <div className='token-modal-header'>
                                <div className='modal-title'>{showFromTokenDropdown ? 'Swap from' : 'Swap to'}</div>
                                <button onClick={() => {
                                    setShowFromTokenDropdown(false);
                                    setShowToTokenDropdown(false);
                                }}>✕</button>
                            </div>
                            <div className='token-modal-search-box'>
                                <div className='token-modal-search'>
                                    <div className='token-modal-search-content'>
                                        <img src={searchIcon} className='search-icon'></img>
                                        <input type='text' placeholder='Enter token name or paste address' />
                                    </div>    
                                </div>
                                <div className='searchable-list'>
                                    <div className='searchable-list-container'>
                                        {tokens.map(token => (
                                            <div
                                                key={token.id}
                                                className='token-modal-item'
                                                onClick={() => handleTokenSelect(token, showFromTokenDropdown ? setFromToken : setToToken)}
                                            >
                                                <img src={token.logo} alt={token.name} className='token-modal-logo' />
                                                <div className='token-modal-info'>
                                                    <span className='token-modal-name'>{token.name}</span>
                                                    <span className='token-modal-symbol'>{token.symbol}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SwapCoin;
