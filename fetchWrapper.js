const axios = require("axios");

class FetchWrapper {
  constructor() {
    this.baseURL = "https://jsonplaceholder.typicode.com";
    this.axiosInstance = axios.create({
      validateStatus: (status) => status >= 200 && status < 500,
    });
  }

  #handleError(error) {
    console.error("Request failed:", error.message);
    throw new Error("Failed to perform the request.");
  }

  #handleSuccess(response) {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  }

  async #sendRequest(resource, method, data = null) {
    const url = `${this.baseURL}/${resource}`;
    try {
      const response = await this.axiosInstance({
        url,
        method,
        data,
      });
      return this.#handleSuccess(response);
    } catch (error) {
      this.#handleError(error);
    }
  }

  async getTodos() {
    return await this.#sendRequest("todos", "GET");
  }

  async getPosts() {
    return await this.#sendRequest("posts", "GET");
  }

  async postTodo(data) {
    return await this.#sendRequest("todos", "POST", data);
  }

  async putTodo(id, data) {
    const url = `${this.baseURL}/todos/${id}`;
    return await this.#sendRequest(url, "PUT", data);
  }

  async patchTodo(id, data) {
    const url = `${this.baseURL}/todos/${id}`;
    return await this.#sendRequest(url, "PATCH", data);
  }

  async deleteTodo(id) {
    const url = `${this.baseURL}/todos/${id}`;
    return await this.#sendRequest(url, "DELETE");
  }

  // ... You can add other methods following the same pattern

  async all() {
    try {
      const [todos, posts] = await Promise.all([
        this.getTodos(),
        this.getPosts(),
      ]);
      return { todos, posts };
    } catch (error) {
      this.#handleError(error);
    }
  }
}

module.exports = FetchWrapper;
