import express from 'express';

const app = express();
const PORT = 3000;

// Sample static JSON data
const products = [
  { id: 1, name: 'Laptop', price: 999.99 },
  { id: 2, name: 'Smartphone', price: 499.99 },
  { id: 3, name: 'Headphones', price: 199.99 },
];

app.get('/',(req, res) => {
  res.send('Welcome to the Product List API!');
});

app.get('/items/:id',(req,res) =>{
    const id = Number(req.params.id);
    const item = products.find(prod => prod.id === id);
    if(!item){
        return res.status(404).json({message: 'Product not found'});
    }
    res.json(item);
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});