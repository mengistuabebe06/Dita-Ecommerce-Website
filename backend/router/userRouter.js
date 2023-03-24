import express from "express";
import User from "../model/userModel.js";
import data from "../data.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import {generateToken, isAdmin, isAuth} from "../utils.js";

const userRouter = express.Router()

userRouter.get("/seed", expressAsyncHandler(async (req,res)=>{
    const createdUsers = await User.insertMany(data.users)
    res.send({createdUsers})
}))
// login
userRouter.post("/signin",  expressAsyncHandler( async (req, res) => {
    try{
        // const { email, password } = req.body;
        // const user = await User.findOne({email: "m@gmail.com"})
        const  user = await  User.findOne({email: req.body.email})
        console.log("user data")
        console.log(user)
        console.log(user)
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    isSeller: user.isSeller,
                    token: generateToken(user),
                });
                return;
            }
        }
        res.status(401).send({ message: 'Invalid email or password' });
    }catch (error){
        console.log(error)
    }
    })
)

userRouter.post('/register' , expressAsyncHandler( async (req, res)=>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    const createUser = await user.save()
    res.send({
        _id: createUser._id,
        name: createUser.name,
        email: createUser.email,
        isAdmin: createUser.isAdmin,
        isSeller: user.isSeller,
        token: generateToken(createUser),
    })
}))

userRouter.get('/:id', expressAsyncHandler(async (req,res) =>{
    const user = await User.findById(req.params.id);
    if(user){
        res.send(user)
    }else {
        res.status(404).send({message: "User Not Found"})
    }
}))
userRouter.put('/profile', isAuth, expressAsyncHandler(async (req,res) =>{
    const user = await User.findById(req.user._id)
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(user.isSeller){
            user.seller.name = req.body.sellerName || user.seller.name
            user.seller.logo = req.body.sellerLogo || user.seller.logo
            user.seller.description = req.body.sellerDescription || user.seller.description
        }
        if(req.body.password){
            user.password = bcrypt.hashSync(req.body.password, 8)
        }
        const updatedUser = await user.save()
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            isSeller: user.isSeller,
            token: generateToken(updatedUser)
        })
    }else {

    }
}))

userRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async (req,res) =>{
    const users = await User.find({})
    if (users){
        res.send(users)
    }else {
        res.status(404).send({message: "User Not Found"})
    }
}))

userRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) =>{
    const user = await User.findById(req.params.id)
    if(user){
        const deleteUser = await user.remove()
        res.send({message: "User Deleted Successfylly", user: deleteUser})
    }else {
        res.status(404).send({message: "User Not Found "})
    }
}))

userRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.isSeller = Boolean(req.body.isSeller);
            user.isAdmin = Boolean(req.body.isAdmin);
            // user.isAdmin = req.body.isAdmin || user.isAdmin;
            const updatedUser = await user.save();
            res.send({ message: 'User Updated', user: updatedUser });
        } else {
            res.status(404).send({ message: 'User Not Found' });
        }
    })
);
export default userRouter