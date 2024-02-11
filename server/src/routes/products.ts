import express from 'express';
import { CheckOut, addProducts, getParticularProduct, getProducts } from '../controllers/product.js';
import multer from "multer";
import path from 'path';
import { stringify } from 'querystring';


const app = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './dist/public/images')
        cb(null, './src/public/images')
    },
    filename: (req, file, cb) =>{
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage})
// route get: /api/products

app.post('/uploadFile',upload.single('file'),(req,res) => {
    console.log(req.file)
    res.status(200).json({file_name: req.file.filename})
})

app.get("/", getProducts)
app.get("/getParticularProduct", getParticularProduct)
app.post("/checkOut", CheckOut)
app.post('/addProducts',upload.single('productImage'),addProducts)

export default app;