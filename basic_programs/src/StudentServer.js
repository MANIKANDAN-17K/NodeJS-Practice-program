const express = require('express');
const app = express();
const StudentRoutes = require('./routes/studentRoutes');
const PORT = 3000;
app.use(express.json());
app.use('/api', StudentRoutes);
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})