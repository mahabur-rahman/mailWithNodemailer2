require("dotenv").config();

const express = require("express");
const emailRouter = require("./routes/router");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use("/api/send", emailRouter);

// listen app
app.listen(PORT, () => {
  console.log(`backend is running at port no  ${PORT}`);
});
