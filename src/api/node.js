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