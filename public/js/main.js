const baseURL = "http://localhost:4242/";
// const todosURL = "https://jsonplaceholder.typicode.com/todos";

// AXIOS GLOBALS
axios.defaults.baseURL = baseURL;

// GET REQUEST
function getTodos() {
  axios
    .get(baseURL)
    .then((res) => showOutput(res))
    .catch((err) => console.error(err.message));
}

// POST REQUEST
function addTodo() {
  const newTodo = {
    title: "is this a new todo?",
    completed: false,
  };
  axios
    .post(baseURL, newTodo)
    .then((res) => showOutput(res))
    .catch((err) => console.error(err.message));
}

// PUT/PATCH REQUEST
function updateTodo() {
    // console.log("PUT Request");
 const updatedTodo = {
    title: "patch  Todo",
    completed: false,
  };
  // put replaces data 
// axios.put(baseURL + "1", updatedTodo)
// .then((res) => showOutput(res))
// .catch((err) => console.error(err.message));

// patch modifyies data
axios.patch(baseURL + "1", updatedTodo)
.then((res) => showOutput(res))
.catch((err) => console.error(err));

}

// DELETE REQUEST
function removeTodo() {
  axios
    .delete(baseURL + "1")
    .then((res) => showOutput(res))
    .catch((err) => console.error(err.message));
  
}

// SIMULTANEOUS DATA
function getData() {
  axios.all([
    axios.get(baseURL),
    
  ])
}

// CUSTOM HEADERS
function customHeaders() {
  console.log("Custom Headers");
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log("Transform Response");
}

// ERROR HANDLING
function errorHandling() {
  console.log("Error Handling");
}

// CANCEL TOKEN
function cancelToken() {
  console.log("Cancel Token");
}

// INTERCEPTING REQUESTS & RESPONSES

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
