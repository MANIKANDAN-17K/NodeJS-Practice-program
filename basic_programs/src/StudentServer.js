const express = require('express');
const db = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const StudentRoutes = require('./routes/studentRoutes');
const errorHandler = require('./middleware/errorHandler');
const PORT = 3000;
app.use(express.json());
app.use('/api', StudentRoutes);
app.use(errorHandler);
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})