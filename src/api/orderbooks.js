import { authClient } from "./client"

export const listOrderbooks = async (nodeAddress) => {
    try {
        const response = await authClient.get(`nodes/${nodeAddress}/order_books`)
        return response.data
    } catch (error) {
        console.error('Error get order book list: ', error)
        throw error
    }
}