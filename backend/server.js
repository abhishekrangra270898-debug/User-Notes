const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

  app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));


app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);
