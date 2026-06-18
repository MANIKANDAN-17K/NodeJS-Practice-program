const express = require('express');
const router = express.Router();

const { registerStudent,updateStudent,updateStudentPartial,deleteStudent } = require('../controller/studentController');

router.post('/register', registerStudent);
router.put('/update/:id', updateStudent);
router.patch('/updatePartial/:id', updateStudentPartial);
router.delete('/delete/:id',deleteStudent);

module.exports = router;