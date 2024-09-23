const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from backend');
});

app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});
