const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const PORT = process.env.PORT ?? 5000;
const app = express();

app.use(cors());

const start = async () => {
  try {
    await mongoose.connect(
      process.env.DB_CONNECTION,
      {
      useNewUrlParser: true,
    })

    app.listen(PORT, () => {
      console.log('server has been started on port ' + PORT);
    });

  } catch(e) {
    console.log(e);
  }
};
start();

const furnitureRoute = require('./routes/furniture');
const slidesRoute = require('./routes/slider');
const mobMenuRoute = require('./routes/mobMenu');


app.use('/api/furniture', furnitureRoute)
app.use('/api/slides', slidesRoute)
app.use('/api/mobMenu', mobMenuRoute)
