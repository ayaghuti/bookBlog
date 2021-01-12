const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');
const path = require('path');

const app = express();

// middlewares
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 5000;

mongoose.connect(config.get("MONGO_URI"), {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false 
})
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error));

  // routes:
app.use('/posts', require('./routes/posts'));
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));

// process.env.NODE_ENV = config.get('NODE_ENV');
// serve static assets if in production
if(process.env.NODE_ENV === 'production') {
  // console.log('inproduction');
// set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}