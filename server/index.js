const express = require("express");

const PORT = process.env.PORT || 5080;

const app = express();

app.use(express.static('client/build'));
const path = require('path');

app.get('*', (req, res) => { 
  res.sendFile(path
    .resolve(__dirname, 'client', 'build', 'index.html'));
});

//app.use("/", express.static("./static"));

app.get("*", async (req, res) => {
  res.status(200).json("hi")
})

app.listen(PORT);