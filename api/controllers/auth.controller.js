import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";


export const signup =async (req, res,next) => {
const {username,email,password} =req.body;


const hashedPassword=bcryptjs.hashSync(password,10);
try{
const newUser = new User({ username, email, password:hashedPassword });
await newUser.save();
console.log(newUser);
res.status(201).json({message:"new user created successfully!"})
}
catch(err)
    {
   next(err);
    }

}

export const signin= async (req,res,next)=>
    {

const {email,password}=req.body;


try{


    const validUser= await User.findOne({email})
    if(!validUser)
        return next(errorHandler(404,'User not found!'))
       
    

    const validPassword=bcryptjs.compareSync(password,validUser.password)
    if(!validPassword)
        return  next(errorHandler(401,'Wrong credentials!'));

    const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET)
    const{password:pass,...rest}=validUser._doc;

    res
      .cookie('accessToken', token, { http: true })
      .status(200)
      .json(rest);

}

catch(err)
{
    next(err);

}
    


}