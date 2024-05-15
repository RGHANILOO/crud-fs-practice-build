const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
const port = 4242;
const cors = require("cors");
const logger = require("./middlewares/logger");
const todosURL = "https://jsonplaceholder.typicode.com/todos";
const postsURL = "https://jsonplaceholder.typicode.com/posts";

app.use(cors()); //allow the cross origin request
app.use(express.json()); //handle the data in json format

//get the todos from the server
app.get("/",logger, async (req, res) => {
  try {
    const response = await axios.get(todosURL, { params: { _limit: 5 } });
    const todos = response.data;
    // console.log(typeof todos);
    res.status(200).send(todos);
    // console.log(todos);
  } catch (error) {
    console.error(error);
  }
});

// post the todos to the server
app.post("/",logger, (req, res) => {
  try {
    const newTodo = req.body; // Get the input from the front-end data
    axios
      .post(todosURL, newTodo)
      .then((response) => {
        res.status(201).send(response.data);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send(error.message);
      });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});
// main url with todo with an addioton of dynamic userId to updated or put
app.put("/:userId", (req, res) => {
  try {
    const updatedTodo = req.body;
    axios
      .put(todosURL + `/${req.params.userId}`, updatedTodo)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send(error.message);
      });
  } catch (error) {
    console.error(error);
  }
});

// patch to update the todo
app.patch("/:userId", (req, res) => {
  try {
    const updatedTodo = req.body;
    axios
      .patch(todosURL + `/${req.params.userId}`, updatedTodo)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send(error.message);
      });
  } catch (error) {
    console.error(error);
  }
});

// delete the todo
app.delete("/:userId", (req, res) => {
  axios
    .delete(todosURL + `/${req.params.userId}`)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error.message);
    });
});

//  get posts and todos simultaneously
app.get("/both", async (req, res) => {
  try {
    const reposne = await axios
      .all([
        axios.get(todosURL, { params: { _limit: 5 } }),
        axios.get(postsURL, { params: { _limit: 5 } }),
      ])
      .then(
        axios.spread((todos, posts) => {
          res.status(200).send({ todos: todos.data, posts: posts.data });
        })
      )
      .catch((error) => {
        console.error(error);
        res.status(500).send(error.message);
      });
  } catch (error) {
    console.error(error.message);
  }
});

//server interceptor or logger
axios.interceptors.request.use(
  config =>{
    console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().toTimeString()}`);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

app.use(logger);

app.use("/static", express.static(path.join(__dirname, "public")));
// catchall this can not be at the top of the server
// app.use((req, res) => {
//   res.status(404).send("Page not found");
// });
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
