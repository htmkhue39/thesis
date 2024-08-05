import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./OrderBook.css";
import { useAccount } from "../AccountContext";
import { getOrderbook, placeOrder } from "../api/orderbooks";
import { HttpStatusCode } from "axios";
import { formatCurrency } from "../helpers/FormatCurrency";

const OrderBook = () => {
  const { orderBookId } = useParams();
  const { selectedAccount } = useAccount();
  const [orderBook, setOrderBook] = useState({
    baseToken: "",
    quoteToken: "",
    bidOrders: [],
    askOrders: [],
    trades: [],
  });
  const [order, setOrder] = useState({
    type: "buy",
    price: 0,
    amount: 0,
  });
  const [orderStr, setOrderStr] = useState({
    price: "0",
    amount: "0",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (selectedAccount && orderBookId) {
      const fetchOrderBook = async () => {
        try {
          const data = await getOrderbook(
            selectedAccount.connectedNodeAddress,
            orderBookId
          );
          console.log("Fetched order book data:", data); // Debug log
          setOrderBook(data);
        } catch (error) {
          console.error("Error fetching order book:", error);
        }
      };

      fetchOrderBook();
    }
  }, [selectedAccount, orderBookId]);

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setOrderStr({ ...orderStr, [name]: value });
  };

  const handleFormatOrder = (e) => {
    const { name, value } = e.target;
    const amount = value === "" ? 0 : Number(value);
    if (amount) {
      setOrder({ ...order, [name]: amount });
      setOrderStr({
        ...orderStr,
        [name]: formatCurrency(amount),
      });
    }
  };

  const handleOrderTypeChange = (type) => {
    setOrder({ ...order, type });
  };

  const handleOrderSubmit = async (e) => {
    if (!selectedAccount) return;

    const price = orderStr.price === "" ? 0 : Number(orderStr.price);
    const amount = orderStr.amount === "" ? 0 : Number(orderStr.amount);

    e.preventDefault();

    try {
      setIsLoading(true);
      const responseStatus = await placeOrder(
        selectedAccount.connectedNodeAddress,
        orderBookId,
        orderBook.baseToken,
        orderBook.quoteToken,
        price,
        amount,
        order.type === "buy"
      );
      if (responseStatus == HttpStatusCode.Created) {
        const updatedOrderBook = await getOrderbook(
          selectedAccount.connectedNodeAddress,
          orderBookId
        );
        setOrderBook(updatedOrderBook);
        setOrder({ type: "buy", price: 0, amount: 0 });
        setOrderStr({ price: "", amount: "" });
        setModalMessage("Order submitted successfully!");
      } else {
        setModalMessage("Failed to submit order. Please try again.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      setModalMessage("Error creating order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderOrderTable = () => {
    const rows = [];
    const minLen = Math.min(
      orderBook.bidOrders.length,
      orderBook.askOrders.length
    );

    for (let i = 0; i < minLen; i++) {
      rows.push(
        <tr key={i}>
          <td className="bids-quantity">{orderBook.bidOrders[i].amount}</td>
          <td className="bids">{orderBook.bidOrders[i].price}</td>
          <td className="asks">{orderBook.askOrders[i].price}</td>
          <td className="asks-quantity">{orderBook.askOrders[i].amount}</td>
        </tr>
      );
    }

    if (minLen < orderBook.bidOrders.length) {
      for (let i = minLen; i < orderBook.bidOrders.length; i++) {
        rows.push(
          <tr key={i}>
            <td className="bids-quantity">{orderBook.bidOrders[i].amount}</td>
            <td className="bids">{orderBook.bidOrders[i].price}</td>
            <td className="asks"></td>
            <td className="asks-quantity"></td>
          </tr>
        );
      }
    } else {
      for (let i = minLen; i < orderBook.askOrders.length; i++) {
        rows.push(
          <tr key={i}>
            <td className="bids-quantity"></td>
            <td className="bids"></td>
            <td className="asks">{orderBook.askOrders[i].price}</td>
            <td className="asks-quantity">{orderBook.askOrders[i].amount}</td>
          </tr>
        );
      }
    }

    return rows;
  };

  return (
    <div className="order-book">
      <div className="order-book-left-wrapper">
        <div className="order-book-left">
          <table className="order-table">
            <thead>
              <tr>
                <th className="bids-quantity">
                  Bids Quantity ({orderBook.baseToken})
                </th>
                <th className="bids">Bids Price ({orderBook.quoteToken})</th>
                <th className="asks">Asks Price ({orderBook.quoteToken})</th>
                <th className="asks-quantity">
                  Asks Quantity ({orderBook.baseToken})
                </th>
              </tr>
            </thead>
            <tbody>{renderOrderTable()}</tbody>
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
                {orderBook.trades &&
                  orderBook.trades.map((trade, index) => (
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
                className={`order-type-button ${order.type === "buy" ? "active" : ""}`}
                onClick={() => handleOrderTypeChange("buy")}
              >
                Buy
              </button>
              <button
                className={`order-type-button ${order.type === "sell" ? "active" : ""}`}
                onClick={() => handleOrderTypeChange("sell")}
              >
                Sell
              </button>
            </div>
          </div>
          <form onSubmit={handleOrderSubmit}>
            <div className="create-order-input">
              <h4 className="create-order-text">Price</h4>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={orderStr.price}
                pattern="[0-9]*[.,]?[0-9]*"
                onChange={handleOrderChange}
                onBlur={handleFormatOrder}
              />
            </div>
            <div className="create-order-input">
              <h4 className="create-order-text">Amount</h4>
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={orderStr.amount}
                pattern="[0-9]*[.,]?[0-9]*"
                onChange={handleOrderChange}
                onBlur={handleFormatOrder}
              />
            </div>
            <div className="button-container">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>

      {isLoading && (
        <div className="modal-overlay">
          <div className="loading-modal">
            <div className="loading-modal-content">
              <div className="spinner"></div>
              <div className="loading-text">Submitting your order...</div>
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
};

export default OrderBook;
