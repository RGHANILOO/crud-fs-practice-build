// Import the Axios library
const axios = require("axios");

// Define a class named HttpService
class HttpService {
  // Constructor function to initialize the class instance
  constructor(baseURL) {
    // Create an Axios instance with the provided base URL
    this.instance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },


    });
  }

  // Method to make a generic HTTP request
  async request(method, url, data = {}, config = {}) {
    try {
      // Make the HTTP request using the specified method
      const response = await this.instance[method](url, data, config);
      // Return the response data
      return response.data;
    } catch (error) {
      // If an error occurs, throw the error response data
      throw error.response.data;
    }
  }

  // Method to make a GET request
  async get(url, config = {}) {
    // Call the generic request method with 'get' as the method parameter
    return this.request("get", url, null, config);
  }

  // Method to make a POST request
  async post(url, data = {}, config = {}) {
    // Call the generic request method with 'post' as the method parameter
    return this.request("post", url, data, config);
  }

  // Method to make a PUT request
  async put(url, data = {}, config = {}) {
    // Call the generic request method with 'put' as the method parameter
    return this.request("put", url, data, config);
  }

  // Method to make a PATCH request
  async patch(url, data = {}, config = {}) {
    // Call the generic request method with 'patch' as the method parameter
    return this.request("patch", url, data, config);
  }

  // Method to make a DELETE request
  async delete(url, config = {}) {
    // Call the generic request method with 'delete' as the method parameter
    return this.request("delete", url, null, config);
  }
}

// Export the HttpService class so it can be used in other modules
module.exports = HttpService;

