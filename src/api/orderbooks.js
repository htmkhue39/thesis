import { authClient } from "./client";

export const listOrderbooks = async (nodeAddress) => {
  try {
    const response = await authClient.get(`nodes/${nodeAddress}/order_books`);
    return response.data;
  } catch (error) {
    console.error("Error get order book list: ", error);
    throw error;
  }
};

export const getOrderbook = async (nodeAddress, orderbookID) => {
  try {
    const response = await authClient.get(
      `nodes/${nodeAddress}/order_books/${orderbookID}`
    );
    return response.data;
  } catch (error) {
    console.error("Error get order book: ", error);
    throw error;
  }
};

export const placeOrder = async (
  nodeAddress,
  orderbookID,
  baseToken,
  quoteToken,
  price,
  amount,
  isBidOrder
) => {
  try {
    const response = await authClient.post(
      `nodes/${nodeAddress}/order_books/${orderbookID}/orders`,
      {
        baseToken,
        quoteToken,
        price,
        amount,
        isBidOrder,
      }
    );
    return response.status;
  } catch (error) {
    console.error("Error get order book: ", error);
    throw error;
  }
};
