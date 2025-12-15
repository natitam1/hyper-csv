import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello From nati");
});

app.listen(3000);
