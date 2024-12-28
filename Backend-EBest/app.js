require('dotenv').config(); // Tải các biến môi trường từ .env
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const router = require('./routers/index');

const app = express();
app.use(express.json());
app.use(cors());

// Kết nối tới MySQL
connectDB();

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to my API' });
});

app.use('/api', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});