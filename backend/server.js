import express from 'express'
import data from "./data.js";
import mongoose from "mongoose";
import userRouter from "./router/userRouter.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import productRouter from "./router/productRouter.js";
import orderRouter from "./router/orderRouter.js";
import uploadRouter from "./router/uploadRouter.js";
import * as path from "path";
// const bodyParser = require('body-parser')

dotenv.config()

const app= express()
//add request body
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect the mongoDB
// mongoose.connect('mongodb://localhost/amazona',{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
// })
//connect to mongoDB
mongoose
    .connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/amazona')
    .then(()=>console.log('MongoDB Connected!'))
    .catch(err=>console.log(err))
//http://localhost:5000/api/users/seed
app.use('/api/users', userRouter);
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)
app.use('/api/uploads', uploadRouter)

// app.get('/api/products',(req,res)=>{
//     res.send(data.products)
// })

app.get('/api/products/:id', (req, res) => {
    const product = data.products.find((x) => x._id === req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', (req,res)=>{
    res.send('Server is ready')
})
// to get the error from mongoDB
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log(`server @ http://localhost:${port}`)
})