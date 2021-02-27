const express = require("express");

const app = express();

//MIDDLEWARE
app.use(express.json());

//ROUTES
app.use("/tasks", require("./routes/task"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server is listening on port http://localhost:${PORT}`)
);
