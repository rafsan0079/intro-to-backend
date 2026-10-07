import {User } from "../models/user.model.js";

const registerUser = async (req,res) => {
    try {
        const {username,email,password} = req.body;

        //basic validation

        if (!username || !password || !email){
            return res.status(400).json({message: "All fields are important!"});
        }
        
        // check if user exists already

        const existing = await User.findOne({email: email.toLowerCase()});
        if(existing){
            return res.status(400).json({message : "user already exists!"});
        }

        //create user

        const user = await User.create({
            username,
            email:email.toLowerCase(),
            password,
            loggedIn: false,
        });

        res.status(201).json({
            message: "User registred",
            user: {id: user._id,email: user.email,username:user.username}
        })

    } catch (error) {
        res.status(500).json({messege: "Internal server error",error:error.message});

    }
};

const loginUser = async (req,res) => {
    try {
         const {email,password} = req.body;

         const user = await User.findOne({
            email: email.toLowerCase()
         });

         if(!user) return res.status(400).json({
            messege : "User not found"
         });

         // compare passwords

         const isMatch = await user.comparePassword(password);
         if(!isMatch) return res.status(400).json({
            messege: "Invalid credentiails"
         });

         user.loggedIn = true;
         await user.save({ validateModifiedOnly: true });

         res.status(200).json({
            messege: "User logged in",
            user: {
                id:user._id,
                email: user.email,
                username:user.username
            }
         });


    } catch (error) {
        res.status(500).json({
            messege: "Internal Server Error"
        });
    }
}

const logoutUser = async (req,res) => {
    try {
        const {email} = req.body;

        if (!email) return res.status(400).json({
            message: "Email is required"
        });

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if(!user) return res.status(404).json({
            message: "User not found"
        });

        if(!user.loggedIn) return res.status(400).json({
            message: "User is not logged in"
        });

        user.loggedIn = false;
        await user.save({ validateModifiedOnly: true });

        res.status(200).json({
            message: "User logged out"
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export {
    registerUser,
    loginUser,
    logoutUser
};