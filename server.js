const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Item = mongoose.model('Item', itemSchema);
console.log('item is ', Item);



app.get('/api/items', (req, res) => {
  Item.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json('Error: ' + err));
});

app.post('/api/items', (req, res) => {
  const { name, description } = req.body;
  const newItem = new Item({
    name,
    description,
  });

  newItem
    .save()
    .then(() => res.json('Item added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

app.put('/api/items/:id', (req, res) => {
  const { name, description } = req.body;
  Item.findByIdAndUpdate(req.params.id, { name, description })
    .then(() => res.json('Item updated!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

app.delete('/api/items/:id', (req, res) => {
  const { name, description } = req.body;
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.json('Item deleted!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

