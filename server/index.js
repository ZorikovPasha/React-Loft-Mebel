const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const dataRouter = require('./routes/dataRouter');
const authRouter = require('./routes/authRouter');

const PORT = process.env.PORT ?? 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/api', dataRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, 
      () => console.log('connected to database')
    )

    app.listen(PORT, () => {
      console.log('server has been started on port ' + PORT);
    });

  } catch(e) {
    console.log(e);
  }
};
start();
