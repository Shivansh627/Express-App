const express = require("express");
const dotenv= require("dotenv").config();
// const route= require("./routes/contactRoutes");


const app = express();

const port = process.env.PORT || 3000;

app.use("/api/contacts",require("./routes/contactRoutes"));

app.listen(port, () => {
  console.log(port);
});
