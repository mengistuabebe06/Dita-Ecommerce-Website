import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../model/productModel.js";
import data from "../data.js";
import {isAdmin, isAuth, isSellerOrAdmin} from "../utils.js";


const productRouter = express.Router()

//products
productRouter.get('/', expressAsyncHandler(async (req,res)=>{
    //get the current seller products
    const seller = req.query.seller || ''
    const category = req.query.category || ''
    const name = req.query.name || ''
    const sellerFilter = seller ? {seller} : {}
    const nameFilter = name ? {name: {$regex: name, $options: 'i'}} : {}
    const categoryFilter = category ? {category} : {}
    const products = await Product.find({
        ...sellerFilter,
        ...nameFilter,
        ...categoryFilter
    }).populate('seller', 'seller.name seller.logo')
    res.send(products)
}))
productRouter.get('/categories', expressAsyncHandler(async (req, res) => {
        const categories = await Product.find().distinct('category');
        res.send(categories);
    })
);
//insert raw data to product table(colletion)
productRouter.get('/seed', expressAsyncHandler(async (req, res)=> {
    // await Product.remove({})
    const createdProduct = await Product.insertMany(data.products)
    res.send({createdProduct})
}))

//product details
productRouter.get('/:id',expressAsyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id).populate(
        'seller',
        'seller.name seller.logo seller.rating seller.numReviews')
    if(product){
        res.send(product)
    }else {
        res.status(404).send({message: "Product Not Found"})
    }
}))

productRouter.post('/', isAuth, isSellerOrAdmin, expressAsyncHandler(async (req,res)=>{
    const product = new Product({
        name: 'samle name ' + Date.now(),
        seller: req.user._id,
        image: '/images/p1.jpg',
        price: 0,
        category: 'sample category',
        brand: 'sample brand',
        counterInStock: 0,
        rating: 0,
        numReviews: 0,
        description: 'sample description',
    });
    const createdProduct = await product.save()
    res.send({message: 'Product Created', product: createdProduct})
}))
productRouter.put('/:id', isAuth, isSellerOrAdmin, expressAsyncHandler(async ( req, res) =>{
    const productId = req.params.id
    const product = await Product.findById(productId)
    if(product){
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.counterInStock = req.body.counterInStock;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        res.send({ message: 'Product Updated', product: updatedProduct });
    } else {
        res.status(404).send({message: 'Product Not Found'})
    };
}))

productRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req,res) =>{
    const product = await Product.findById(req.params.id);
    if (product) {
        const deleteProduct = await product.remove();
        res.send({ message: 'Product Deleted', product: deleteProduct });
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
}))
export default productRouter