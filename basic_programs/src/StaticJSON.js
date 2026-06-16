import express from 'express';

const app = express();
const PORT = 3000;

const products = [
  { id: 1, name: 'Product A', price: 10.99 },
  { id: 2, name: 'Product B', price: 19.99 },
  { id: 3, name: 'Product C', price: 5.99 },
];

app.get('/',(req,res)=>{
    res.send('Welcome to the Product API!');
})

app.get('/products',(req,res) =>{
    res.json(products);
})

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})