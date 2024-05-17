const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
const port = 4242;
const cors = require("cors");
const logger = require("./middlewares/logger");
const HttpService = require("./httpservices");

app.use(cors()); //allow the cross origin request
app.use(express.json()); //handle the data in json format
app.use(express.urlencoded({ extended: false })); //handle the data in urlencoded format

const httpService = new HttpService("https://jsonplaceholder.typicode.com");

// get the todos from the server
app.get("/todos", async (req, res) => {
  try {
    const todos = await httpService.get("/todos");

    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

// post the todos to the server
app.post("/todos", async (req, res) => {
  try {
    const newTodo = req.body;
    const createdTodo = await httpService.post("/todos", newTodo);
    res.status(201).json(createdTodo);
    
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
    
  }
});

// update the todo by id put & patch
app.put("/todos/:userId", async(req, res)=>{
  try {
    const updatedTodo = req.body;
    const updatedTodoId = req.params.userId;
    const updatedTodoData = await httpService.put(`/todos/${updatedTodoId}`, updatedTodo);
    res.status(200).json(updatedTodoData);

  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
    
  }
})

// Get todos with limit of 5 (default)
// app.get("/todos", logger, async (req, res) => {
//   try {
//     const todos = await fetchWrapper.getTodos({
//       params: { _limit: req.query.limit || 5 },
//     });
//     res.status(200).json(todos);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error fetching todos");
//   }
// });

// Get a single todo by ID
// app.get("/todos/:id", logger, async (req, res) => {
//   try {
//     const todoId = req.params.id;
//     const todo = await fetchWrapper.getTodo(todoId); // Assuming a getTodo method in FetchWrapper
//     res.status(200).send(todo);
//   } catch (error) {
//     console.error(error);
//     res.status(404).send("Todo not found"); // Consider a specific error code for "not found"
//   }
// });

// Post a new todo
// app.post("/todos", logger, async (req, res) => {
//   try {
//     const newTodo = req.body;
//     const createdTodo = await fetchWrapper.postTodo(newTodo);
//     res.status(201).send(createdTodo);
//   } catch (error) {
//     console.error(error);
//     res.status(400).send("Error creating todo"); // Consider a specific error code for "bad request"
//   }
// });

// Update a todo by ID (assuming PUT for full update)
// app.put("/todos/:id", logger, async (req, res) => {
//   try {
//     const todoId = req.params.id;
//     const updatedTodo = req.body;
//     await fetchWrapper.putTodo(todoId, updatedTodo);
//     res.status(200).send("Todo updated successfully"); // Or send the updated data
//   } catch (error) {
//     console.error(error);
//     res.status(400).send("Error updating todo"); // Consider a specific error code for "bad request"
//   }
// });

// Patch a todo by ID (assuming PATCH for partial update)
// app.patch("/todos/:id", logger, async (req, res) => {
//   try {
//     const todoId = req.params.id;
//     const updatedTodo = req.body;
//     await fetchWrapper.patchTodo(todoId, updatedTodo);
//     res.status(200).send("Todo patched successfully"); // Or send the patched data
//   } catch (error) {
//     console.error(error);
//     res.status(400).send("Error patching todo"); // Consider a specific error code for "bad request"
//   }
// });

// Delete a todo by ID
// app.delete("/todos/:id", logger, async (req, res) => {
//   try {
//     const todoId = req.params.id;
//     await fetchWrapper.deleteTodo(todoId);
//     res.status(200).send("Todo deleted successfully");
//   } catch (error) {
//     console.error(error);
//     res.status(404).send("Todo not found"); // Consider a specific error code for "not found"
//   }
// });

// Get all posts (assuming a separate endpoint for posts)
// app.get("/posts", logger, async (req, res) => {
//   try {
//     const posts = await fetchWrapper.getPosts({
//       params: { _limit: req.query.limit || 5 },
//     });
//     res.status(200).send(posts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error fetching posts");
//   }
// });

// Get a single post by ID (assuming a getPosts method in FetchWrapper)
// app.get("/posts/:id", logger, async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const post = await fetchWrapper.getPost(postId); // Assuming a getPost method in FetchWrapper
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error fetching posts");
//   }
// });
// //get the todos from the server
// app.get("/",logger, async (req, res) => {
//   try {
//     const response = await axios.get(todosURL, { params: { _limit: 5 } });
//     const todos = response.data;
//     // console.log(typeof todos);
//     res.status(200).send(todos);
//     // console.log(todos);
//   } catch (error) {
//     console.error(error);
//   }
// });

// // post the todos to the server
// app.post("/",logger, (req, res) => {
//   try {
//     const newTodo = req.body; // Get the input from the front-end data
//     axios
//       .post(todosURL, newTodo)
//       .then((response) => {
//         res.status(201).send(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//         res.status(500).send(error.message);
//       });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// });
// // main url with todo with an addioton of dynamic userId to updated or put
// app.put("/:userId", (req, res) => {
//   try {
//     const updatedTodo = req.body;
//     axios
//       .put(todosURL + `/${req.params.userId}`, updatedTodo)
//       .then((response) => {
//         res.status(200).send(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//         res.status(500).send(error.message);
//       });
//   } catch (error) {
//     console.error(error);
//   }
// });

// // patch to update the todo
// app.patch("/:userId", (req, res) => {
//   try {
//     const updatedTodo = req.body;
//     axios
//       .patch(todosURL + `/${req.params.userId}`, updatedTodo)
//       .then((response) => {
//         res.status(200).send(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//         res.status(500).send(error.message);
//       });
//   } catch (error) {
//     console.error(error);
//   }
// });

// // delete the todo
// app.delete("/:userId", (req, res) => {
//   axios
//     .delete(todosURL + `/${req.params.userId}`)
//     .then((response) => {
//       res.status(200).send(response.data);
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).send(error.message);
//     });
// });

// //  get posts and todos simultaneously
// app.get("/both", async (req, res) => {
//   try {
//     const reposne = await axios
//       .all([
//         axios.get(todosURL, { params: { _limit: 5 } }),
//         axios.get(postsURL, { params: { _limit: 5 } }),
//       ])
//       .then(
//         axios.spread((todos, posts) => {
//           res.status(200).send({ todos: todos.data, posts: posts.data });
//         })
//       )
//       .catch((error) => {
//         console.error(error);
//         res.status(500).send(error.message);
//       });
//   } catch (error) {
//     console.error(error.message);
//   }
// });

//server interceptor or logger
axios.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date().toTimeString()}`
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

app.use(logger);

// app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));
// catchall this can not be at the top of the server
// app.use((req, res) => {
//   res.status(404).send("Page not found");
// });
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
