import { createUser, getUser, userExists, userLogin } from "../Database/users.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const SECRETKEY='FRITTER'

export const signup = async (req,res)=>{
    const {user_id,username,password,disp_img_link}=req.body;
    // try{
        const existingUser = await userExists(user_id);
        if(existingUser){
            
            // console.log(user_id)
            res.send({message:'user already exists'});
            return;
        }   
        const hashedPassword=await bcrypt.hash(password,10)
        const userDetails={user_id,username,password:hashedPassword,disp_img_link};
        await createUser(userDetails);
        const token=  jwt.sign({id:user_id},SECRETKEY);
        res.send({user:userDetails,token:token});
    // }
    // catch(error){
    //     console.log("Something went wrong");
    //     res.send({error:"Error"});
    // }
}

export const login = async (req,res)=>{
    const {user_id,password}=req.body;
    // try{
        const existingUser = await userExists(user_id);
        if(!existingUser){ 
            // console.log(user_id)
            res.send({message:'user does not exist'});
            return;
        }   
        const matchPassword = await bcrypt.compare(password, await userLogin(user_id))
        if(!matchPassword){
            res.send({message:'invalid credentials'});
            return;
        }
        const token=  jwt.sign({id:user_id},SECRETKEY);
        res.send({user:await getUser(user_id),token:token});
    //     const hashedPassword=await bcrypt.hash(password,10)
    //     const userDetails={user_id,username,password:hashedPassword,disp_img_link};
    //     await createUser(userDetails);
    //     const token=  jwt.sign({id:user_id},SECRETKEY);
    // // }
    // catch(error){
    //     console.log("Something went wrong");
    //     res.send({error:"Error"});
    // }
}