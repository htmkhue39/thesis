import axios from "axios";
import { authClient } from "./client";

export const listNodes = async () => {
  try {
    const response = await authClient.get(`nodes`);
    return response.data;
  } catch (error) {
    console.error("Error generate mnemonic:", error);
    throw error;
  }
};

export const getNode = async (nodeAddress) => {
  try {
    const response = await authClient.get(`nodes/${nodeAddress}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching nodes:", error);
    throw error;
  }
};

export const connectNode = async (nodeAddress) => {
  try {
    const response = await authClient.post(`nodes/connect`, { nodeAddress });

    const ret = { connected: false };
    if (response.status === axios.HttpStatusCode.Ok) {
      ret.connected = true;
    }

    return ret;
  } catch (error) {
    console.error("Error connecting node:", error);
    throw error;
  }
};
