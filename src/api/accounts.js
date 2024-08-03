import { publicClient } from "./client";

export const generateMnemonic = async () => {
  try {
    const response = await publicClient.post(`accounts/mnemonics`);
    return response.data;
  } catch (error) {
    console.error("Error generate mnemonic:", error);
    throw error;
  }
};

export const createAccount = async (newAccount) => {
  try {
    const response = await publicClient.post(`/accounts`, newAccount);
    return response.data;
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
  }
};

export const importAccount = async (mnemonic, passcode) => {
  try {
    const response = await publicClient.post(`accounts/import`, {
      mnemonic,
      passcode,
    });
    const data = response.data;
    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    console.error("Error checking account:", error);
    throw error;
  }
};
