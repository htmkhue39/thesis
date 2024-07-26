import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from '../AccountContext';
import { getTokens, getBalances, getExchangeRate, getFees, createTransaction } from '../../mockApi';

import '../components/Button.css';
import './SwapCoin.css';
import './Explore.css';
import './AddLiquidity.css';

import dropIcon from '../assets/dropdown-icon.svg';
import switchIcon from '../assets/switch.png';
import searchIcon from '../assets/search-icon.svg';

function SwapCoin() {
    const { selectedAccount } = useAccount();
    const navigate = useNavigate();
    const [tokens, setTokens] = useState([]);
    const [balances, setBalances] = useState({});
    const [fromToken, setFromToken] = useState({ symbol: 'ETH', logo: '/coin/ethereum.png' });
    const [toToken, setToToken] = useState(null);
    const [fromAmount, setFromAmount] = useState(0);
    const [toAmount, setToAmount] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(null);
    const [fee, setFee] = useState(null);
    const [showFromTokenDropdown, setShowFromTokenDropdown] = useState(false);
    const [showToTokenDropdown, setShowToTokenDropdown] = useState(false);
    const [isAmountExceedBalance, setIsAmountExceedBalance] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        fetchTokens();
    }, []);

    useEffect(() => {
        if (selectedAccount && selectedAccount.connectedNodeAddress) {
            fetchBalances(selectedAccount.address, selectedAccount.connectedNodeAddress);
        }
    }, [selectedAccount]);

    useEffect(() => {
        if (!fromToken || !toToken || fromAmount <= 0 || !exchangeRate || fee === null) {
            setToAmount(0);
            return;
        }
        const amountOut = fromAmount * exchangeRate * (1 - fee / 100);
        setToAmount(amountOut.toFixed(2));
    }, [fromAmount, fromToken, toToken, exchangeRate, fee]);

    useEffect(() => {
        if (fromToken && toToken) {
            fetchExchangeRate();
            fetchFees();
        }
    }, [fromToken, toToken]);

    const fetchTokens = async () => {
        try {
            const data = await getTokens();
            setTokens(data);
        } catch (error) {
            console.error('Error fetching tokens:', error);
        }
    };

    const fetchBalances = async (accountAddress, nodeAddress) => {
        try {
            const balances = await getBalances(accountAddress, nodeAddress);
            console.log('Fetched balances:', balances); 
            setBalances(balances);
        } catch (error) {
            console.error('Error fetching balances:', error);
        }
    };

    const fetchExchangeRate = async () => {
        try {
            const rate = await getExchangeRate();
            setExchangeRate(rate);
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
        }
    };

    const fetchFees = async () => {
        try {
            const fee = await getFees();
            setFee(fee);
        } catch (error) {
            console.error('Error fetching fees:', error);
        }
    };

    const getSwapButtonState = () => {
        if (!selectedAccount?.connectedNodeAddress) {
            return { disabled: false, text: "+ Connect to Node" };
        }
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

    const handleSwap = async () => {
        if (!selectedAccount || !fromToken || !toToken || !fromAmount) {
            return;
        }

        const newTransaction = {
            id: Date.now().toString(),
            address: selectedAccount.address,
            nodeAddress: selectedAccount.connectedNodeAddress,
            fromToken: fromToken.symbol,
            toToken: toToken.symbol,
            fromAmount: fromAmount,
            toAmount: toAmount,
            date: new Date().toISOString(),
        };

        try {
            setIsLoading(true);
            await createTransaction(newTransaction);
            setModalMessage('Swap successful!');
        } catch (error) {
            console.error('Error recording transaction:', error);
            setModalMessage('Swap failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleConnectToNode = () => {
        navigate('/nodes');
    };
    
    return (
        <div className={`app-content-wrapper ${showFromTokenDropdown || showToTokenDropdown ? 'modal-open' : ''}`}>
            <div className='app-content'>
                <div className='swap-coin-wrapper'>
                    <div className="swap-coin-content">
                        <div className='swap-coin-header'>
                            <h2 className='title'>Swap</h2>
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
                            {fromToken && toToken && fromAmount > 0 && exchangeRate && fee !== null && (
                                <div className='initial-prices'>
                                    <div className="price-info">
                                        1 {toToken.symbol} = {(1 / exchangeRate).toFixed(8)} {fromToken.symbol}
                                    </div>
                                    <div className="price-info">
                                        Fee ({fee}%) = {(fromAmount * fee / 100).toFixed(2)} {fromToken.symbol}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="swap-footer">
                            <footer className='swap-footer-btn'>
                                <button 
                                    className="btn-primary" 
                                    disabled={swapButtonState.disabled} 
                                    onClick={selectedAccount?.connectedNodeAddress ? handleSwap : handleConnectToNode}
                                >
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

            {isLoading && (
                <div className='modal-overlay'>
                    <div className='loading-modal'>
                        <div className='loading-modal-content'>
                            <div className='spinner'></div>
                            <div className='loading-text'>Processing your swap...</div>
                        </div>
                    </div>
                </div>
            )}

            {modalMessage && (
                <div className='modal-overlay'>
                    <div className='result-modal'>
                        <div className='result-modal-content'>
                            <div className='result-text'>{modalMessage}</div>
                            <button onClick={() => setModalMessage('')} className='btn-primary'>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SwapCoin;
