import Form from "../models/Form.js"
import  { json } from "express";

export async function getAllUsers(req,res) {
    try {
        const users= await Form.find().sort({createdAt:-1});
        res.status(200).json({users})
        
    } catch (error) {
        console.error('Error',error);
        res.status(500).json({message:"error in fetching"})
        
    }
    
}

export async function postUsers(req,res) {

    try {
        const {firstName,lastName,email,password}= req.body;
        const newUsers = new Form({firstName,lastName,email,password
        });
        const saveUsers = await newUsers.save();
        res.status(201).json(saveUsers)
        
    } catch (error) {
        console.error('error',error);
        res.status(500).json({message:'fail to create user'})
    }
    
}

export async function updateUsers(req, res) {
    try {
        const {firstName,lastName,email,password} = req.body;
        const updateUsers = await Form.findByIdAndUpdate(req.params.id,{firstName,lastName,email,password})
        if (!updateUsers){
            return
            res.status(404).json({message:'User not found'})
        }
        res.status(200).json({message:'userUpdated!'})
    } 
    catch (error) {
        console.error('error',error);
        res.status(500).json({message:'fail to create user'})
    }
}

export async function deleteUsers(req,res) {

    try {
        const deleteUser = await Form.findByIdAndDelete(req.params.id)
       if(!deleteUser) return res.status(404).json({message:'Notes not found'})
        res.status(200).json({message:'Deleted user'})
    } catch (error) {
        console.error('error',error);
        res.status(500).json({message:'fail to create user'})
    }
}

export async function getById(req,res) {

    try {
     const searchUser = await Form.findById(req.params.id);
        if(!searchUser)return res.status(404).json({message:'User not found'});
        res.json(searchUser);
        
    } catch (error) {
        console.error('error',error);
        res.status(500).json({message:'fail to create user'})
    }
    
}