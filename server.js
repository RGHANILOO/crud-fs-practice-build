const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
const port = 4242;
const cors = require("cors");
const todosURL = "https://jsonplaceholder.typicode.com/todos";
const postsURL = "https://jsonplaceholder.typicode.com/posts";

app.use(cors());//allow the cross origin request
app.use(express.json());//handle the data in json format

//get the todos from the server
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(todosURL, { params: { _limit: 5 } });
    const todos = response.data;
    // console.log(typeof todos);
    res.status(200).send(todos);
    // console.log(todos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// post the todos to the server
app.post("/", (req, res) => {
  try {
    const newTodo = req.body; // Get the input from the front-end data
    axios.post(todosURL, newTodo).then((response) => {
      res.status(201).send(response.data);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/", (req, res) => {
  try {
    const updatedTodo = req.body;
    axios.put(todosURL + `/${req.params.userId}`, updatedTodo).then((response) => {
      res.status(200).send(response.data);
    });
    
  } catch (error) {
    
  }
});
app.update
app.delete("/user", (req, res) => {
  res.send("Got a DELETE request at /user");
});

app.get("/users/:userId/books/:bookId", (req, res) => {
  res.send(req.params);
});

app.all("/secret", (req, res, next) => {
  console.log("accesing the secret section");
  next();
});

app.use("/static", express.static(path.join(__dirname, "public")));
// catchall this can not be at the top of the server
// app.use((req, res) => {
//   res.status(404).send("Page not found");
// });
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
