import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import config from './config/config.js';
import { initializePassport } from './config/passport.config.js';
import router from './routes/index.js';

const app = express();
const { mongoUrl, port } = config;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get('/', (req, res) => {
  res.send('API de Ecommerce funcionando');
});


initializePassport();

mongoose.connect(mongoUrl)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});