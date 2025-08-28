import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import config from './config/config.js';
import { initializePassport } from './config/passport.config.js';
import router from './routes/index.js';

const app = express();
const { mongoUrl, port } = config;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Passport
initializePassport();
app.use(passport.initialize());

// Test route
app.get('/', (req, res) => {
  res.send('API de Ecommerce funcionando');
});

// MongoDB
mongoose.connect(mongoUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', router);

// Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
