import { AuthClient } from "./client";

export const ListNodes = async () => {
    try {
        const response = await AuthClient.get(`nodes`)
        return response.data;
    } catch (error) {
        console.error('Error generate mnemonic:', error);
        throw error;
    }
}