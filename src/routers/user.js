const express=require('express')
const router= new express.Router()
const User=require("../models/user")
const auth=require('../middleware/auth')

router.post('/users',async(req,res)=>{
    const user= new User(req.body)
    try{
        await user.save()
        const token=await user.generateAuthToken()
        res.status(201).send({user,token})
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/login',async(req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken()
        res.send({user,token})
    }
    catch(e){
        res.status(400).send('Unable to login!')
    }
    
})

router.post('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })

        await req.user.save()
        res.status(200).send()
    }catch(e){
        res.status(500).send(e)
    }
})

router.post('/users/logoutAll',auth, async(req,res)=>{
    try{
        req.user.tokens=[]

        await req.user.save()
        res.status(200).send()
    }catch(e){
        res.status(500).send(e)
    }
})


router.get('/users/me',auth,async(req,res)=>{
    try{
        res.status(200).send(req.user)
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.get('/users/:id',async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        if(!user){
            return res.status(404).send('User not found!')
        }
        res.status(200).send(user)
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.patch('/users/:id',async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['name','email','password','age']
    const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send('invalid updates!')
    }
    try{
        const user=await User.findById(req.params.id)
        updates.forEach((update)=>{
            user[update]=req.body[update]
        })
        await user.save()
        
        if(!user){
            return res.status(404).send('User not found')
        }

        res.status(200).send(user)
    }
    catch(e){
        res.status(400).send(e)
    }
    
})

router.delete('/users/:id',async(req,res)=>{
    try{
        const user=await User.findByIdAndDelete(req.params.id)
        if(!user){
            res.status(404).send('User not found')
        }
        res.status(200).send(user)
    }
    catch(e){
        res.status(400).send(e)
    }
})

module.exports = router