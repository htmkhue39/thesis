import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8080", // Replace with your API's base URL
  timeout: 5000, // You can set a timeout if needed
});

export const generateMnemonic = async () => {
  try {
    const response = await axiosClient.post(`/mnemonics`);
    return response.data;
  } catch (error) {
    console.error("Error generate mnemonic:", error);
    throw error;
  }
};

// Function to fetch data
async function fetchData() {
  try {
    // Making a GET request to the specified URL
    const response = await generateMnemonic();

    // Logging the response data
    console.log(response);
  } catch (error) {
    // Handling errors
    console.error("Error fetching data:", error);
  }
}

// URL to fetch data from
const url = "http://127.0.0.1:8080/mnemonics";

// Calling the fetchData function
fetchData(url);
