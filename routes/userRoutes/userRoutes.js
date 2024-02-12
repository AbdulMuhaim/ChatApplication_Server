const express = require('express')
const userRouter = express.Router()
const {register,login,refreshToken,fetchProfileData} = require('../../controllers/userController')

userRouter.post('/login',login)
userRouter.post('/register',register)
userRouter.post('/refreshToken',refreshToken)
userRouter.get('/fetchProfileData/:id',fetchProfileData)

module.exports = userRouter
