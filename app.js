const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const offerRoutes = require('./routes/offerRoutes');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api', offerRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT || 5000, () => console.log('Server running'));
}).catch(err => console.error(err));