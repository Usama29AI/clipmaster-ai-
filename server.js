
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("."));

app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "ClipMaster AI Backend is running!"
  });
});

app.listen(PORT, () => {
  console.log(`ClipMaster AI running on port ${PORT}`);
});
