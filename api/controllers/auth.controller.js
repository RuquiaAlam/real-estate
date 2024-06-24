import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup =async (req, res) => {
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
        res.status(500).json({message:err.message})
    }

}

