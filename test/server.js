const express = require('express');
const morgan = require('morgan');
const app = express();
const { router } = require('./booksRouter');

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(morgan('tiny'));

app.post('/home', (req, res) => {
  if (!req.body.goit) {
    return res.status(400).json({ status: 'goit parameter is required' });
  }
  res.json({ javascript: 'some text', body: req.body });
});

app.listen(PORT, err => {
  if (err) console.error('Error at aserver launch:', err);
  console.log(`Server works at Port: ${PORT}`);
});
