const user = require('../models/userModels')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateToken,authenticateRefreshToken} = require('../middlewares/authMiddleware')


const register = async(req,res)=>{
const {name,password,email} = req.body
const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await user.create({
            name: name,
            password: hashedPassword,
            email: email
          });
          res.status(200).json({ message: "registered successfully", status: true });
    } catch (error) {
        res.status(400).json({ message: "User not found" });
    }
}


const login = async (req,res)=>{
    const {name,password} = req.body
    try {
        const userData = await user.findOne({name})
        if(userData){
            const passwordMatch = await bcrypt.compare(password, userData.password);
            if(passwordMatch){
                const token = generateToken(userData._id)
                return res.status(200).json({ message: "login successful", status: true, token, userData });
            }else{
                return res.status(400).json({ message: "Incorrect password" });
            }
        }else{
            return res.status(400).json({ message: "User not found" });
        }
        
    } catch (error) {
        console.log(error);
    }
}

const refreshToken = async(req,res)=>{

    const refreshToken = authenticateRefreshToken()

}


const fetchProfileData = async(req,res)=>{
    const id = req.params.id
    console.log(id);
    const data = user.findOne({id})
}
  
module.exports = {
    register,
    login,
    refreshToken,
    fetchProfileData
}