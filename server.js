const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const routes = require("./routes/index");
const DB = require("./config/database");


const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1", routes);
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 400;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

DB.then(()=>{
    console.log("Connection Successfull");
    app.listen(port, console.log(`Listening on port : ${port}`))
})

