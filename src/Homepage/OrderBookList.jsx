import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Explore.css';
import '../components/Button.css';
import { getOrderBooks, getTokens, searchOrderBooks } from '../../mockApi';
import CombinedTokenLogo from '../components/CombinedTokenLogo';

const OrderBookList = () => {
  const [orderBooks, setOrderBooks] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrderBooks();
    fetchTokens();
  }, []);

  const fetchOrderBooks = async () => {
    try {
      const data = await getOrderBooks();
      setOrderBooks(data);
    } catch (error) {
      console.error('Error fetching order books:', error);
    }
  };

  const fetchTokens = async () => {
    try {
      const tokenData = await getTokens();
      setTokens(tokenData);
    } catch (error) {
      console.error('Error fetching tokens:', error);
    }
  };

  const handleOrderBookClick = (orderBookId) => {
    navigate(`/orderbooks/${orderBookId}`);
  };

  const getTokenLogo = (symbol) => {
    const token = tokens.find(token => token.symbol === symbol);
    return token ? token.logo : '';
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      const data = await searchOrderBooks(query);
      setOrderBooks(data);
    } else {
      fetchOrderBooks();
    }
  };

  return (
    <div className='app-content-wrapper'>
      <div className='app-content'>
        <div className='homepage'>
          <div className="main-content">
            <div className='balance-section'>
              <h2>Order Book List</h2>
            </div>
            <div className='search-bar'>
              <input
                type="text"
                placeholder="Search for order books..."
                value={searchQuery}
                onChange={handleSearchChange}
                className='search-input'
              />
            </div>
            <div className='activity-section'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Token Pair</th>
                    <th>Token A</th>
                    <th>Token B</th>
                  </tr>
                </thead>
                <tbody>
                  {orderBooks.map((orderBook, index) => (
                    <tr key={orderBook.id} onClick={() => handleOrderBookClick(orderBook.id)}>
                      <td>{index + 1}</td>
                      <td>
                        <CombinedTokenLogo
                          logo1={getTokenLogo(orderBook.tokenA)}
                          logo2={getTokenLogo(orderBook.tokenB)}
                        />
                      </td>
                      <td>{orderBook.tokenA}</td>
                      <td>{orderBook.tokenB}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBookList;
