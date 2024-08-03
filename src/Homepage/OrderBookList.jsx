import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Explore.css";
import "../components/Button.css";
import CombinedTokenLogo from "../components/CombinedTokenLogo";
import { getCoinLogo } from "../helpers/GetCoinLogo";
import { listOrderbooks } from "../api/orderbooks";

const OrderBookList = () => {
  const [orderBooks, setOrderBooks] = useState([]);
  // const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrderBooks();
  }, []);

  const fetchOrderBooks = async () => {
    try {
      const data = await listOrderbooks();
      setOrderBooks(data.orderbooks);
    } catch (error) {
      console.error("Error fetching order books:", error);
    }
  };

  const handleOrderBookClick = (orderBookId) => {
    navigate(`/orderbooks/${orderBookId}`);
  };

  // const handleSearchChange = async (e) => {
  //   const query = e.target.value;
  //   setSearchQuery(query);
  //   if (query) {
  //     const data = await searchOrderBooks(query);
  //     setOrderBooks(data);
  //   } else {
  //     fetchOrderBooks();
  //   }
  // };

  return (
    <div className="app-content-wrapper">
      <div className="app-content">
        <div className="homepage">
          <div className="main-content">
            <div className="balance-section">
              <h2>Order Book List</h2>
            </div>
            {/* <div className='search-bar'>
              <input
                type="text"
                placeholder="Search for order books..."
                value={searchQuery}
                onChange={handleSearchChange}
                className='search-input'
              />
            </div> */}
            <div className="activity-section">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Token Pair</th>
                    <th>Base token</th>
                    <th>Quote token</th>
                  </tr>
                </thead>
                <tbody>
                  {orderBooks.map((orderBook, index) => (
                    <tr
                      key={orderBook.id}
                      onClick={() => handleOrderBookClick(orderBook.id)}
                    >
                      <td>{index + 1}</td>
                      <td>
                        <CombinedTokenLogo
                          logo1={getCoinLogo(orderBook.baseToken)}
                          logo2={getCoinLogo(orderBook.quoteToken)}
                        />
                      </td>
                      <td>{orderBook.baseToken}</td>
                      <td>{orderBook.quoteToken}</td>
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
