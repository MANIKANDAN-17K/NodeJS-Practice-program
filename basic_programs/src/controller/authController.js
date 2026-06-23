const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const register = async (req, res) => {
    try{const { email,password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO users (email, password) VALUES (?,?)`;
    db.query(sql, [email,hashedPassword],(err,results) => {
        if(err){
            return res.status(500).json({ error: 'Error registering user' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    })}
    catch(error){
        res.status(500).json({ error: 'Error registering user' });
    }     
}

const login = async (req, res) => {
    try{
        const {email,password} = req.body;
        const sql = `SELECT * FROM users WHERE email = ?`;
        db.query(sql,[email],async (err,results)=>{
            if(err){
                return res.status(500).json({ error: 'Error logging in' });
            }
            if(results.length === 0){
                return res.status(401).json({ error: 'Invalid email' });
            }
            const user = results[0];
            if(await !bcrypt.compare(password,user.password)){
                return res.status(401).json({ error: 'Invalid password' });
            }
            const token = jwt.sign(
                { id:user.id, email:user.email},
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            )
            res.status(200).json({ message: 'Login successful', token:token });
        })
    }catch(error){
        res.status(500).json({ error: 'Error logging in' });
    }
}


module.exports = { register, login };