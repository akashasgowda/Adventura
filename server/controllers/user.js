import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser) // we don't have user
            return res.status(404).json({ message: "User doesn't exist."});
            
        // check whether entered password matches
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
            
        if(!isPasswordCorrect)
            return res.status(400).json({ message: "Wrong Password."});

        // if both credentials are valid we want to send a json web token
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result: existingUser,token});

    } catch (error) {
        // undefined server error => 500
        res.status(500).json({message: "Something went wrong"});
    }
};


export const signup = async(req, res) => {
    const {  firstName, lastName, email, password, confirmPassword } = req.body;

    try{        
        const existingUser = await User.findOne({email});
        
        if(existingUser)
            return res.status(400).json({message: "User already exists"});
    
         if( password !== confirmPassword)
            return res.status(400).json({message: "Password doesn't match"});

        // hashing password
        const hashedPassword = await bcrypt.hash(password,12);

        const result = await User.create({email,password: hashedPassword, name: `${firstName} ${lastName}` });
        
        const token = jwt.sign({email: result.email, id:result._id,},'test', {expiresIn: "1h"} );

        res.status(201).json({ result, token });

    }catch(error){
        res.status(500).json({message: "Something went wrong"});
        console.log(error);
    }
}
