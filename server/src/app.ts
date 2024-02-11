import express from 'express';
// Importing Routes
import productRoutes from './routes/products.js';
import { connectDb } from './utils/db.js';
import cors from 'cors';

const port = 4000;

connectDb();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('./dist/public'));
app.use(express.static('./src/public')); 

//using routes
app.use('/api/products', productRoutes);    


app.listen(port,()  =>{
    console.log(`Server is running on  http://localhost:${port}`);
})