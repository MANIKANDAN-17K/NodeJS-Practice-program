const db = require('../config/db');

const getAllProducts = (req,res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const sql = 'SELECT * FROM products ORDER BY price ASC LIMIT ? OFFSET ?';
    db.query(sql,[limit,offset],(err,results) =>{
        if(err){
            return res.status(500).json({error: err.message});
        }
        res.status(200).json({products: results});
    })
}
module.exports = {
    getAllProducts
}