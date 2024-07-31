import { authClient } from "./client";

export const listPools = async (nodeAddress) => {
    try {
        const response = await authClient.get(`nodes/${nodeAddress}/pools`)
        console.log(response)
        return response.data
    } catch (error) {
        console.error('Error get pool list:', error);
        throw error;
    }
};

export const listTransactions = async (nodeAddress) => {
    try {
        const response = await authClient.get(`nodes/${nodeAddress}/transactions`)
        return response.data
    } catch (error) {
        console.error('Error get transaction list:', error);
        throw error;
    }
};

export const listBalances = async (nodeAddress) => {
    try {
        const response = await authClient.get(`nodes/${nodeAddress}/balances`)
        return response.data
    } catch (error) {
        console.error('Error get balance list:', error);
        throw error;
    }
};

export const listPositions = async (nodeAddress) => {
    try {
        const response = await authClient.get(`nodes/${nodeAddress}/positions`)
        return response.data
    } catch (error) {
        console.error('Error get position list:', error);
        throw error;
    }
};

export const checkPool = async (nodeAddress, fromToken, toToken, fromAmount, toAmount) => {
    try {
        const req = {
            tokenA: fromToken,
            tokenB: toToken,
            amountA: fromAmount,
            amountB: toAmount,
        }

        const response = await authClient.post(`nodes/${nodeAddress}/check_pool`, req);
        const res = response.data

        return {
            existed: res.existed,
            priceFromTo: res.priceAToB,
            priceToFrom: res.priceBToA,
        }
    } catch (error) {
        console.error('Error checking pool:', error);
        throw error;
    }
};