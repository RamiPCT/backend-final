import dotenv from 'dotenv';
dotenv.config();

export default {
    mongoUrl: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/ecommerce',
    jwtSecret: process.env.JWT_SECRET || 'secretkey',
    port: process.env.PORT || 8080
};