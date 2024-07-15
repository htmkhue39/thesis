import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './OrderBook.css';

const OrderBook = () => {
  const nodeAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
  const [tradeHistory, setTradeHistory] = useState([]);
  const [order, setOrder] = useState({ type: 'buy', price: '', amount: '' });

  useEffect(() => {
    const fetchOrderBook = async () => {
      const response = await fetch(`http://localhost:3001/nodes?address=${nodeAddress}`);
      const data = await response.json();
      setOrderBook(data[0].orderBook);
      setTradeHistory(data[0].orderBook.tradeHistory);
    };

    fetchOrderBook();
  }, [nodeAddress]);

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleOrderTypeChange = (type) => {
    setOrder({ ...order, type });
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="order-book">
      <div className="order-book-left-wrapper">
        <div className='order-book-left'>
            <table className="order-table">
            <thead>
                <tr>
                <th className="bids-quantity">Bids Quantity</th>
                <th className="bids">Bids Price</th>
                <th className="asks">Asks Price</th>
                <th className="asks-quantity">Asks Quantity</th>
                </tr>
            </thead>
            <tbody>
                {orderBook.bids.map((bid, index) => (
                <tr key={index}>
                    <td className="bids-quantity">{bid.quantity}</td>
                    <td className="bids">{bid.price}</td>
                    <td className="asks">{orderBook.asks[index]?.price}</td>
                    <td className="asks-quantity">{orderBook.asks[index]?.quantity}</td>
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
                {tradeHistory.map((trade, index) => (
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
    </div>
  );
};

export default OrderBook;
