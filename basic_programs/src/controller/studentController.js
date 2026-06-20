const students = require('../model/studentModel');

const registerStudent = (req, res) => {
    const { name, department } = req.body;

    if(!name || !department){
        return res.status(400).json({ message: "Name and department are required" });
    }

    const newStudent = {
        id: students.length + 1,
        name,
        department
    }
    students.push(newStudent);
    res.status(201).json({
        message: 'Student registered successfully',
        student: newStudent
    });
};
const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(stud => stud.id === id);
    if(!student){
        return res.status(404).json({ message: "student not found" });
    }
    const { name, department } = req.body;
    student.name = name;
    student.department = department;
    res.status(200).json({
        message: 'Student updated successfully',
        student: student
    });
};


const updateStudentPartial = (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(stud => stud.id === id);
    if(!student){
        return res.status(404).json({ message: "student not found" });
    }
    if(req.body.name){
        student.name = req.body.name;   
    }
    if(req.body.department){
        student.department = req.body.department;
    }
    if(!req.body.name && !req.body.department){
        return res.status(400).json({ message: "No fields to update" });
    }
    res.status(200).json({
        message: 'Student updated successfully',
        student: student
    });
};
const deleteStudent = (req, res) => {
    const id  = parseInt(req.params.id);
    const studidx = students.findIndex(stud => stud.id === id);
    if(studidx === -1){
        return res.status(404).json({ message: "student not found" });
    }

    const deleteStudent = students.splice(studidx, 1);
    res.status(200).json({
        message: 'Student deleted successfully',
        student: deleteStudent[0]
    });
};
const StudentGetById = (req,res,next) => {
    try{
        const id = parseInt(req.params.id);
        const student = students.find(
            s => s.id === id
        );
        if(!student){
            const error = new Error("Student not found");
            error.statusCode = 404;

            return next(error);
        }
        res.status(200).json({
            message: 'Student retrieved successfully',
            student: student
        });
    }catch(err){
        next(err);
    }
}

module.exports = {
    registerStudent,
    updateStudent,
    updateStudentPartial,
    deleteStudent,
    StudentGetById
}