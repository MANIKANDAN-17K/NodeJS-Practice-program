const express = require('express');
const router = express.Router();
const { getAllProducts } = require('../controller/productController');
const { registerStudent,updateStudent,updateStudentPartial,deleteStudent, StudentGetById } = require('../controller/studentController');

router.post('/register', registerStudent);
router.put('/update/:id', updateStudent);
router.patch('/updatePartial/:id', updateStudentPartial);
router.delete('/delete/:id',deleteStudent);
router.get('/getById/:id',StudentGetById);
router.get('/products', getAllProducts);
module.exports = router;