const db = require("../config/db");

const getAuthorWithBooks = (req,res) =>{
    const authorId = req.params.id;
    const sql = `
    SELECT a.id AS authorId, a.name AS authorName,
    b.id AS bookId, b.title AS bookTitle
    FROM authors a 
    LEFT JOIN books b
    ON a.id = b.author_id
    WHERE a.id = ?`;

    db.query(sql, [authorId],(err,results)=>{
        if(err){
            return res.status(500).json({error: "Database error"});
        }
        if(results.length === 0){
            return res.status(404).json({error: "Author not found"});
        }
        const author = {
            id: results[0].authorId,
            name: results[0].authorName,
            books: results.map(row=>({
                id: row.bookId,
                title: row.bookTitle
            }))} 
        res.status(200).json(author);
       });
};
module.exports = { getAuthorWithBooks };