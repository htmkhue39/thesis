import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from '../AccountContext';
import { getTokens, getBalances, addInitialLiquidity, addLiquidity, checkPool } from '../../mockApi';

import '../components/Button.css';
import './AddLiquidity.css';
import './Explore.css';
import './SwapCoin.css';

import dropIcon from '../assets/dropdown-icon.svg';
import searchIcon from '../assets/search-icon.svg';
import backIcon from '../assets/back-icon.svg';

function AddLiquidity() {
    const { selectedAccount } = useAccount();
    const navigate = useNavigate();
    const [tokens, setTokens] = useState([]);
    const [balances, setBalances] = useState({});
    const [fromToken, setFromToken] = useState({ symbol: 'ETH', logo: '/coin/ethereum.png' });
    const [toToken, setToToken] = useState(null);
    const [fromAmount, setFromAmount] = useState(0);
    const [toAmount, setToAmount] = useState(0);
    const [showFromTokenDropdown, setShowFromTokenDropdown] = useState(false);
    const [showToTokenDropdown, setShowToTokenDropdown] = useState(false);
    const [isAmountExceedBalance, setIsAmountExceedBalance] = useState(false);
    const [showFeeOptions, setShowFeeOptions] = useState(false);
    const [selectedFee, setSelectedFee] = useState("0.30%");
    const [poolExists, setPoolExists] = useState(false);
    const [priceFromTo, setPriceFromTo] = useState(null);
    const [priceToFrom, setPriceToFrom] = useState(null);
    const [poolShare, setPoolShare] = useState('0%');
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
        if (selectedAccount && selectedAccount.connectedNodeAddress) {
            checkIfPoolExists();
        } else {
            setPoolExists(false);
        }
    }, [selectedAccount, fromToken, toToken]);

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
            setBalances(balances);
        } catch (error) {
            console.error('Error fetching balances:', error);
        }
    };

    const checkIfPoolExists = async () => {
        if (!selectedAccount || !fromToken || !toToken) return;

        const data = {
            nodeAddress: selectedAccount.connectedNodeAddress,
            fromToken: fromToken.symbol,
            toToken: toToken.symbol
        };

        try {
            const response = await checkPool(data);
            setPoolExists(response.poolExists);
            setPriceFromTo(response.priceFromTo);
            setPriceToFrom(response.priceToFrom);
            setPoolShare(response.poolShare);
        } catch (error) {
            console.error('Error checking pool:', error);
        }
    };

    const getAddLiquidityButtonState = () => {
        if (!selectedAccount.connectedNodeAddress) {
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
        return { disabled: false, text: "Add Liquidity" };
    };

    const addLiquidityButtonState = getAddLiquidityButtonState();

    const toggleFeeOptions = () => {
        setShowFeeOptions(!showFeeOptions);
    };

    const selectFeeOption = (fee) => {
        setSelectedFee(fee);
        setShowFeeOptions(false);
    };

    const handleTokenSelect = (token, setToken) => {
        setToken(token);
        setShowFromTokenDropdown(false);
        setShowToTokenDropdown(false);
    };

    const getBalance = (token) => {
        if (!token) return 0;
        return balances[token.symbol] || 0;
    };

    const handleFirstAmountChange = (e) => {
        const value = e.target.value;
        const amount = value === '' ? 0 : Number(value);
        setFromAmount(amount);
        setIsAmountExceedBalance(amount > getBalance(fromToken));
    };

    const handleSecondAmountChange = (e) => {
        const value = e.target.value;
        const amount = value === '' ? 0 : Number(value);
        setToAmount(amount);
        setIsAmountExceedBalance(amount > getBalance(toToken));
    };

    const handleAddLiquidity = async () => {
        if (!selectedAccount || !fromToken || !toToken || !fromAmount || !toAmount) {
            return;
        }

        const liquidityData = {
            accountId: selectedAccount.id,
            nodeAddress: selectedAccount.connectedNodeAddress,
            fromToken: fromToken.symbol,
            toToken: toToken.symbol,
            fromAmount: fromAmount,
            toAmount: toAmount,
            fee: selectedFee
        };

        try {
            setIsLoading(true);
            let response;
            if (poolExists) {
                response = await addLiquidity(liquidityData);
            } else {
                response = await addInitialLiquidity(liquidityData);
            }

            if (response.success) {
                setModalMessage('Liquidity added successfully!');
                setFromAmount(0);
                setToAmount(0);
                setPriceFromTo(response.priceFromTo);
                setPriceToFrom(response.priceToFrom);
                setPoolShare(response.poolShare);
            } else {
                setModalMessage('Failed to add liquidity. Please try again.');
            }
        } catch (error) {
            console.error('Error adding liquidity:', error);
            setModalMessage('Error adding liquidity. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleConnectToNode = () => {
        navigate('/nodes');
    };

    const handleBack = () => {
        navigate('/pool');
    };

    return (
        <div className={`app-content-wrapper`}>
            <div className='app-content'>
                <div className='swap-coin-wrapper'>
                    <div className="liquidity-content">
                        <div className='liquidity-header'>
                            <div className='liquidity-back-icon'>
                                <img src={backIcon} className='liquidity-back-icon-detail' onClick={handleBack} />
                            </div>
                            <h2 className='title liquidity-title'>Add Liquidity</h2>
                        </div>

                        <div className='prepare-liquidity-wrapper'>
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
                                                onChange={handleFirstAmountChange}
                                                className='amount-input'
                                                disabled={!selectedAccount.connectedNodeAddress}
                                            />
                                        </div>
                                    </div>
                                    <div className='balance'>
                                        Balance: {getBalance(fromToken)}
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
                                                onChange={handleSecondAmountChange}
                                                className='amount-input'
                                                disabled={!selectedAccount.connectedNodeAddress}
                                            />
                                        </div>
                                    </div>
                                    <div className='balance'>
                                        Balance: {getBalance(toToken)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {!poolExists && (toToken != null) && (
                            <div className='fee-dropdown'>
                                <div className='fee-dropdown-header' onClick={toggleFeeOptions}>
                                    <span>{selectedFee}</span>
                                    <img src={dropIcon} className='dropdown-icon' alt='Dropdown' />
                                </div>
                                {showFeeOptions && (
                                    <div className='fee-options'>
                                        {['0.01%', '0.05%', '0.30%', '1.00%'].map(fee => (
                                            <div
                                                key={fee}
                                                className={`fee-option ${selectedFee === fee ? 'selected' : ''}`}
                                                onClick={() => selectFeeOption(fee)}
                                            >
                                                {fee} fee tier
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {selectedAccount.connectedNodeAddress && fromToken && toToken && (
                            <div className='initial-prices'>
                                <div className='price-info'>
                                    <span>{fromToken.symbol}/{toToken.symbol} price:</span>
                                    <span>{priceFromTo || '-'}</span>
                                </div>
                                <div className='price-info'>
                                    <span>{toToken.symbol}/{fromToken.symbol} price:</span>
                                    <span>{priceToFrom || '-'}</span>
                                </div>
                                <div className='pool-share'>
                                    <span>Share of pool:</span>
                                    <span>{poolShare}</span>
                                </div>
                            </div>
                        )}

                        <div className="swap-footer">
                            <footer className='swap-footer-btn'>
                                <button
                                    className="btn-primary"
                                    disabled={addLiquidityButtonState.disabled}
                                    onClick={selectedAccount?.connectedNodeAddress ? handleAddLiquidity : handleConnectToNode}
                                >
                                    {addLiquidityButtonState.text}
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
                            <div className='loading-text'>Submitting your liquidity...</div>
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

export default AddLiquidity;
