import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../AccountContext";

import "../components/Button.css";
import "./AddLiquidity.css";
import "./Explore.css";
import "./SwapCoin.css";

import dropIcon from "../assets/dropdown-icon.svg";
import searchIcon from "../assets/search-icon.svg";
import backIcon from "../assets/back-icon.svg";
import { getNode } from "../api/nodes";
import { getCoinLogo } from "../helpers/GetCoinLogo";
import { listBalances } from "../api/node";
import {
  checkPool,
  confirmProvideLiquidity,
  simulateProvideInitialLiquidity,
  simulateProvideLiquidity,
} from "../api/pools";
import { formatCurrency } from "../helpers/FormatCurrency";

function AddLiquidity() {
  const { selectedAccount } = useAccount();
  const navigate = useNavigate();
  const [tokens, setTokens] = useState([]);
  const [balances, setBalances] = useState({});
  const [fromToken, setFromToken] = useState({
    symbol: "ETH",
    logo: "/coin/ethereum.png",
  });
  const [toToken, setToToken] = useState(null);
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const [fromAmountStr, setFromAmountStr] = useState("0");
  const [toAmountStr, setToAmountStr] = useState("0");
  const [showFromTokenDropdown, setShowFromTokenDropdown] = useState(false);
  const [showToTokenDropdown, setShowToTokenDropdown] = useState(false);
  const [isAmountExceedBalance, setIsAmountExceedBalance] = useState(false);
  const [showFeeOptions, setShowFeeOptions] = useState(false);
  const [selectedFee, setSelectedFee] = useState(0.03);
  const [poolExisted, setPoolExisted] = useState(false);
  const [priceFromTo, setPriceFromTo] = useState(null);
  const [priceToFrom, setPriceToFrom] = useState(null);
  const [poolShare, setPoolShare] = useState(null);
  const [lpTokens, setLPTokens] = useState(null);
  const [poolIndex, setPoolIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (selectedAccount && selectedAccount.connectedNodeAddress) {
      fetchTokens(selectedAccount.connectedNodeAddress);
      fetchBalances(selectedAccount.connectedNodeAddress);
    }
  }, [selectedAccount]);

  useEffect(() => {
    if (
      selectedAccount &&
      selectedAccount.connectedNodeAddress &&
      fromToken &&
      toToken
    ) {
      checkIfPoolExists();
    } else {
      setPoolExisted(false);
    }
  }, [selectedAccount, fromToken, toToken]);

  const fetchTokens = async (nodeAddress) => {
    try {
      const res = await getNode(nodeAddress);
      setTokens(res.tokens);
    } catch (error) {
      console.error("Error fetching tokens:", error);
    }
  };

  const fetchBalances = async (nodeAddress) => {
    try {
      const res = await listBalances(nodeAddress);

      const balanceMap = {};
      for (const balance of res.balances) {
        balanceMap[balance.token] = balance.amount;
      }
      console.log(balanceMap);

      setBalances(balanceMap);
    } catch (error) {
      console.error("Error fetching balances:", error);
    }
  };

  const checkIfPoolExists = async () => {
    if (
      !selectedAccount ||
      !selectedAccount.connectedNodeAddress ||
      !fromToken ||
      !toToken
    )
      return;

    try {
      const response = await checkPool(
        selectedAccount.connectedNodeAddress,
        fromToken.symbol,
        toToken.symbol,
        fromAmount,
        toAmount
      );

      console.log(response);

      setPoolExisted(response.existed);
      setPriceFromTo(response.priceFromTo);
      setPriceToFrom(response.priceToFrom);
      setPoolShare(response.poolShare);
    } catch (error) {
      console.error("Error checking pool:", error);
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

  useEffect(() => {
    if (poolExisted) return;
    if (fromAmount == 0 || toAmount == 0) {
      setPriceFromTo(null);
      setPriceToFrom(null);
      return;
    }
    setPriceFromTo(fromAmount / toAmount);
    setPriceToFrom(toAmount / fromAmount);
  }, [poolExisted, fromAmount, toAmount]);

  const simulateProvide = (fromAmount, toAmount) => {
    if (!toToken) return;
    if (fromAmount <= 0 || toAmount <= 0) return;
    if (fromAmount > getBalance(fromToken) || toAmount > getBalance(toToken)) {
      setIsAmountExceedBalance(true);
    } else {
      setIsAmountExceedBalance(false);
    }

    if (poolExisted) {
      handleSimulateProvideLiquidity(fromAmount, toAmount);
    } else {
      handleSimulateProvideInitialLiquidity(fromAmount, toAmount);
    }
  };

  const handleSimulateProvideLiquidity = async (fromAmount, toAmount) => {
    try {
      const response = await simulateProvideLiquidity(
        selectedAccount.connectedNodeAddress,
        fromToken.symbol,
        toToken.symbol,
        fromAmount,
        toAmount,
        selectedFee / 100
      );
      setPoolShare(response.poolShare);
      setLPTokens(response.lpTokens);
      setPoolIndex(response.poolId);
    } catch (error) {
      console.error("Error getting pool share:", error);
    }
  };

  const handleSimulateProvideInitialLiquidity = async (
    fromAmount,
    toAmount
  ) => {
    try {
      const response = await simulateProvideInitialLiquidity(
        selectedAccount.connectedNodeAddress,
        fromToken.symbol,
        toToken.symbol,
        fromAmount,
        toAmount,
        selectedFee / 100
      );
      setPoolShare(response.poolShare);
      setLPTokens(response.lpTokens);
      setPoolIndex(response.poolId);
    } catch (error) {
      console.error("Error getting pool share:", error);
    }
  };

  const handleAmountChange = (setState) => {
    return (e) => {
      const value = e.target.value;
      if (value[0] == "-") return;
      setState(e.target.value);
    };
  };

  const handleFromAmountFormat = () => {
    const fromAmount = fromAmountStr === "" ? 0 : Number(fromAmountStr);

    setFromAmount(fromAmount);
    setFromAmountStr(formatCurrency(fromAmount));

    let calcToAmount = toAmount;
    if (poolExisted) {
      calcToAmount = fromAmount * priceFromTo;
      setToAmount(calcToAmount);
      setToAmountStr(formatCurrency(calcToAmount));
    }

    simulateProvide(fromAmount, calcToAmount);
  };

  const handleToAmountFormat = () => {
    const toAmount = toAmountStr === "" ? 0 : Number(toAmountStr);

    setToAmount(toAmount);
    setToAmountStr(formatCurrency(toAmount));

    let calcFromAmount = fromAmount;
    if (poolExisted) {
      calcFromAmount = toAmount * priceToFrom;
      setFromAmount(calcFromAmount);
      setFromAmountStr(formatCurrency(calcFromAmount));
    }

    simulateProvide(calcFromAmount, toAmount);
  };

  const handleAddLiquidity = async () => {
    console.log("poolIndex: ", poolIndex);

    const fromAmount = fromAmountStr === "" ? 0 : Number(fromAmountStr);
    const toAmount = toAmountStr === "" ? 0 : Number(toAmountStr);

    if (
      !selectedAccount ||
      !poolIndex ||
      !fromToken ||
      !toToken ||
      !fromAmount ||
      !toAmount
    ) {
      return;
    }

    try {
      setIsLoading(true);
      await confirmProvideLiquidity(
        selectedAccount.connectedNodeAddress,
        poolIndex,
        fromToken.symbol,
        toToken.symbol,
        fromAmount,
        toAmount
      );

      setModalMessage("Liquidity added successfully!");
      fetchBalances(selectedAccount.connectedNodeAddress);
      setFromAmount(0);
      setToAmount(0);
      setFromAmountStr("0");
      setToAmountStr("0");
      setLPTokens(0);
      checkIfPoolExists();
    } catch (error) {
      console.error("Error adding liquidity:", error);
      setModalMessage("Error adding liquidity. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectToNode = () => {
    navigate("/nodes");
  };

  const handleBack = () => {
    navigate("/pool");
  };

  return (
    <div className={`app-content-wrapper`}>
      <div className="app-content">
        <div className="swap-coin-wrapper">
          <div className="liquidity-content">
            <div className="liquidity-header">
              <div className="liquidity-back-icon">
                <img
                  src={backIcon}
                  className="liquidity-back-icon-detail"
                  onClick={handleBack}
                />
              </div>
              <h2 className="title liquidity-title">Add Liquidity</h2>
            </div>

            <div className="prepare-liquidity-wrapper">
              <div className="prepare-swap">
                <div className="prepare-swap-from">
                  <div className="from-token">
                    <div
                      className="token-dropdown"
                      onClick={() => setShowFromTokenDropdown(true)}
                    >
                      <div className="token-list">
                        {fromToken && (
                          <img
                            src={getCoinLogo(fromToken.symbol)}
                            alt={fromToken.symbol}
                            className="token-logo"
                          />
                        )}
                        <span className="swap-token-name">
                          {fromToken ? fromToken.symbol : "Select token"}
                        </span>
                      </div>
                      <img
                        src={dropIcon}
                        className="dropdown-search"
                        alt="Dropdown"
                      />
                    </div>
                    <div className="amount-wrapper">
                      <input
                        type="number"
                        value={fromAmountStr}
                        onChange={handleAmountChange(setFromAmountStr)}
                        onBlur={handleFromAmountFormat}
                        pattern="[0-9]*[.,]?[0-9]*"
                        className="amount-input"
                        disabled={!selectedAccount.connectedNodeAddress}
                      />
                    </div>
                  </div>
                  <div className="balance">
                    Balance: {formatCurrency(getBalance(fromToken))}
                  </div>
                </div>
                <div className="prepare-swap-to">
                  <div className="to-token">
                    <div
                      className="token-dropdown"
                      onClick={() => setShowToTokenDropdown(true)}
                    >
                      <div className="token-list">
                        {toToken && (
                          <img
                            src={getCoinLogo(toToken.symbol)}
                            alt={toToken.symbol}
                            className="token-logo"
                          />
                        )}
                        <span className="swap-token-name">
                          {toToken ? toToken.symbol : "Select token"}
                        </span>
                      </div>
                      <img
                        src={dropIcon}
                        className="dropdown-search"
                        alt="Dropdown"
                      />
                    </div>
                    <div className="amount-wrapper">
                      <input
                        type="number"
                        value={toAmountStr}
                        onChange={handleAmountChange(setToAmountStr)}
                        onBlur={handleToAmountFormat}
                        pattern="[0-9]*[.,]?[0-9]*"
                        className="amount-input"
                        disabled={!selectedAccount.connectedNodeAddress}
                      />
                    </div>
                  </div>
                  <div className="balance">
                    Balance: {formatCurrency(getBalance(toToken))}
                  </div>
                </div>
              </div>
            </div>

            {!poolExisted && toToken != null && (
              <div className="fee-dropdown">
                <div className="fee-dropdown-header" onClick={toggleFeeOptions}>
                  <span>{selectedFee}% fee tier</span>
                  <img
                    src={dropIcon}
                    className="dropdown-icon"
                    alt="Dropdown"
                  />
                </div>
                {showFeeOptions && (
                  <div className="fee-options">
                    {[0.01, 0.05, 0.03, 1.0].map((fee) => (
                      <div
                        key={fee}
                        className={`fee-option ${selectedFee === fee ? "selected" : ""}`}
                        onClick={() => selectFeeOption(fee)}
                      >
                        {fee}% fee tier
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {selectedAccount.connectedNodeAddress && fromToken && toToken && (
              <div className="initial-prices">
                <div className="price-info">
                  <span>
                    {fromToken.symbol}/{toToken.symbol} price:
                  </span>
                  <span>{formatCurrency(priceFromTo) || "-"}</span>
                </div>
                <div className="price-info">
                  <span>
                    {toToken.symbol}/{fromToken.symbol} price:
                  </span>
                  <span>{formatCurrency(priceToFrom) || "-"}</span>
                </div>
                <div className="pool-share">
                  <span>Share of pool:</span>
                  <span>
                    {poolShare ? formatCurrency(poolShare * 100) : "-"}%
                  </span>
                </div>
                <div className="pool-share">
                  <span>Minted LP Tokens:</span>
                  <span>{lpTokens ? formatCurrency(lpTokens) : "-"}</span>
                </div>
              </div>
            )}

            <div className="swap-footer">
              <footer className="swap-footer-btn">
                <button
                  className="btn-primary"
                  disabled={addLiquidityButtonState.disabled}
                  onClick={
                    selectedAccount?.connectedNodeAddress
                      ? handleAddLiquidity
                      : handleConnectToNode
                  }
                >
                  {addLiquidityButtonState.text}
                </button>
              </footer>
            </div>
          </div>
        </div>
      </div>
      {(showFromTokenDropdown || showToTokenDropdown) && (
        <div className="modal-overlay">
          <div className="token-modal">
            <div className="token-modal-content">
              <div className="token-modal-header">
                <div className="modal-title">
                  {showFromTokenDropdown ? "Swap from" : "Swap to"}
                </div>
                <button
                  onClick={() => {
                    setShowFromTokenDropdown(false);
                    setShowToTokenDropdown(false);
                  }}
                >
                  ✕
                </button>
              </div>
              <div className="token-modal-search-box">
                <div className="token-modal-search">
                  <div className="token-modal-search-content">
                    <img src={searchIcon} className="search-icon"></img>
                    <input
                      type="text"
                      placeholder="Enter token name or paste address"
                    />
                  </div>
                </div>
                <div className="searchable-list">
                  <div className="searchable-list-container">
                    {tokens.map((token) => (
                      <div
                        key={token.id}
                        className="token-modal-item"
                        onClick={() =>
                          handleTokenSelect(
                            token,
                            showFromTokenDropdown ? setFromToken : setToToken
                          )
                        }
                      >
                        <img
                          src={getCoinLogo(token.symbol)}
                          alt={token.name}
                          className="token-modal-logo"
                        />
                        <div className="token-modal-info">
                          <span className="token-modal-name">{token.name}</span>
                          <span className="token-modal-symbol">
                            {token.symbol}
                          </span>
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
        <div className="modal-overlay">
          <div className="loading-modal">
            <div className="loading-modal-content">
              <div className="spinner"></div>
              <div className="loading-text">Submitting your liquidity...</div>
            </div>
          </div>
        </div>
      )}

      {modalMessage && (
        <div className="modal-overlay">
          <div className="result-modal">
            <div className="result-modal-content">
              <div className="result-text">{modalMessage}</div>
              <button
                onClick={() => setModalMessage("")}
                className="btn-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddLiquidity;
