const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let storedData = null;

app.post('/store', (req, res) => {
  const { data, expirationTime } = req.body;

  storedData = {
    data,
    expirationTime: Date.now() + expirationTime * 1000,
  };

  res.send('Data stored successfully!');
});

app.get('/getData', (req, res) => {
  if (storedData && Date.now() < storedData.expirationTime) {
    res.json(storedData.data);
  } else {
    res.status(404).send('No data available');
  }
});

app.listen(port, () => {
  console.log(`server http://localhost:${port}`);
});
