const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();
const userRoutes = require('./routes/userRoutes/userRoutes')
const adminRoutes = require('./routes/adminRoutes/adminRoutes')


const app = express()
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI;


const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

app.use(express.json());
app.use(cors(corsOptions));

app.use('/',userRoutes)
app.use('/admin',adminRoutes)



mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});