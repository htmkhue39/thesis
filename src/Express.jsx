const express = require('express');
const app = express();
const port = 3000;

let accounts = [
  { name: 'Account 1', address: '0x76721d7dE385beF55F8447C0afC704f7057e9aBE' },
  { name: 'Account 2', address: '0x12345d7dE385beF55F8447C0afC704f7057e1234' }
];

app.use(express.json());

app.get('/api/accounts', (req, res) => {
  res.json(accounts);
});

app.post('/api/accounts', (req, res) => {
  const newAccount = req.body;
  accounts.push(newAccount);
  res.status(201).json(newAccount);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
