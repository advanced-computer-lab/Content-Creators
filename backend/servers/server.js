import express from "express";

const app = express();
const port = process.env.PORT || "8000";

// Starting server
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

//exports app for app.js
module.exports = app;
