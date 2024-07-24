import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderBook, submitOrder } from '../../mockApi';
import './OrderBook.css';

const OrderBook = () => {
  const { orderBookId } = useParams();
  const [orderBook, setOrderBook] = useState({ bidsA: [], asksA: [], tradeHistoryA: [], bidsB: [], asksB: [], tradeHistoryB: [], tokenA: '', tokenB: '' });
  const [order, setOrder] = useState({ type: 'buy', price: '', amount: '', token: 'A' });
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    if (orderBookId) {
      const fetchOrderBook = async () => {
        try {
          const data = await getOrderBook(orderBookId);
          console.log('Fetched order book data:', data); // Debug log
          setOrderBook(data);
        } catch (error) {
          console.error('Error fetching order book:', error);
        }
      };

      fetchOrderBook();
    }
  }, [orderBookId]);

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleOrderTypeChange = (type) => {
    setOrder({ ...order, type });
  };

  const handleTokenChange = (e) => {
    const token = e.target.value;
    setOrder({ ...order, token });
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      orderBookId,
      type: order.type,
      token: order.token,
      price: parseFloat(order.price),
      amount: parseFloat(order.amount)
    };

    try {
      setIsLoading(true);
      const response = await submitOrder(orderData);
      if (response.success) {
        const updatedOrderBook = await getOrderBook(orderBookId);
        setOrderBook(updatedOrderBook);
        setOrder({ type: 'buy', price: '', amount: '', token: order.token });
        setModalMessage('Order submitted successfully!');
      } else {
        setModalMessage('Failed to submit order. Please try again.');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      setModalMessage('Error creating order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getBids = () => {
    return order.token === 'A' ? orderBook.bidsA : orderBook.bidsB;
  };

  const getAsks = () => {
    return order.token === 'A' ? orderBook.asksA : orderBook.asksB;
  };

  const getTradeHistory = () => {
    return order.token === 'A' ? orderBook.tradeHistoryA : orderBook.tradeHistoryB;
  };

  return (
    <div className="order-book">
      <div className="order-book-left-wrapper">
        <div className='order-book-left'>
          <table className="order-table">
            <thead>
              <tr>
                <th className="bids-quantity">Bids Quantity ({order.token === 'A' ? orderBook.tokenA : orderBook.tokenB})</th>
                <th className="bids">Bids Price ({order.token === 'A' ? orderBook.tokenA : orderBook.tokenB})</th>
                <th className="asks">Asks Price ({order.token === 'A' ? orderBook.tokenA : orderBook.tokenB})</th>
                <th className="asks-quantity">Asks Quantity ({order.token === 'A' ? orderBook.tokenA : orderBook.tokenB})</th>
              </tr>
            </thead>
            <tbody>
              {getBids().map((bid, index) => (
                <tr key={index}>
                  <td className="bids-quantity">{bid.quantity}</td>
                  <td className="bids">{bid.price}</td>
                  <td className="asks">{getAsks()[index]?.price}</td>
                  <td className="asks-quantity">{getAsks()[index]?.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="order-book-right">
        <div className="trade-history-wrapper">
          <h3>Trade History</h3>
          <div className="trade-history">
            <table className="order-table">
              <thead>
                <tr>
                  <th>Price</th>
                  <th>Amount</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {getTradeHistory().map((trade, index) => (
                  <tr key={index}>
                    <td>{trade.price}</td>
                    <td>{trade.amount}</td>
                    <td>{new Date(trade.time).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="create-order">
          <div className="create-order-header">
            <h3>Create Order</h3>
            <div className="order-type-buttons">
              <select
                name="token"
                value={order.token}
                onChange={handleTokenChange}
                className="token-select"
              >
                <option value="A">{orderBook.tokenA}</option>
                <option value="B">{orderBook.tokenB}</option>
              </select>
              <button
                className={`order-type-button ${order.type === 'buy' ? 'active' : ''}`}
                onClick={() => handleOrderTypeChange('buy')}
              >
                Buy
              </button>
              <button
                className={`order-type-button ${order.type === 'sell' ? 'active' : ''}`}
                onClick={() => handleOrderTypeChange('sell')}
              >
                Sell
              </button>
            </div>
          </div>
          <form onSubmit={handleOrderSubmit}>
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={order.price}
              onChange={handleOrderChange}
            />
            <input
              type="text"
              name="amount"
              placeholder="Amount"
              value={order.amount}
              onChange={handleOrderChange}
            />
            <div className="button-container">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>

      {isLoading && (
        <div className='modal-overlay'>
          <div className='loading-modal'>
            <div className='loading-modal-content'>
              <div className='spinner'></div>
              <div className='loading-text'>Submitting your order...</div>
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
};

export default OrderBook;
