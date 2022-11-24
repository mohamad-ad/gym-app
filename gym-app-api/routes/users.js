const express = require('express');
const Joi = require('joi');
const router = express.Router();
const User = require('../models/User');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('../middleware/authorization');
const admin = require('../middleware/admin');
const Exercise = require("../models/Exercise");


router.post('', async (req, res) =>{
    let user = _.pick(req.body, ['username', 'email', 'password'])
    const {error} = validation(user);
    if(error) return res.status(400).send(error.details[0].message)

    try{
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        user = new User(user);
        console.log(user)
        await user.save();
        const jwtToken = user.generateUserJwt();
        res.header('x-token-header',jwtToken).send(_.pick(user, ['username','_id','favIds']));
    }catch(error){
        res.status(500).send(error.message)
    }

});

router.get('/me', [auth, admin], async (req,res)=>{
    try{
        const user = await User.findById(req.user._id).select({password:0})
        res.send(user);
    }catch(err){
        res.status(500).send(err.message)
    }
    
})

router.get('/favorite',auth, async(req, res) =>{
    let user = await User.findById(req.user._id);
    console.log(user)
    if(user.favIds.length===0) return res.send('there are no favorite excercises yet');
    console.log(user.favIds)
    
    const exercises = await Exercise.find({'id':{$in:user.favIds}})
    // console.log(exercises)

    res.send(exercises);
})
router.post('/favorite',auth, async(req, res) =>{
    let user = await User.findById(req.user._id);
    let exist = user.favIds.find(fav=> fav=== req.body.id)
    if(exist) return res.send('exercises is already in favorites')
    user.favIds = [...user.favIds, req.body.id ]
    user = await user.save();
    res.send(user.favIds)
})
router.delete('/favorite/:id',auth, async(req, res) =>{
    let user = await User.findById(req.user._id);
    let exist = user.favIds.find(fav=> fav===req.params.id)
    if(!exist) return res.send('exercises is not in favorites');
    user.favIds = user.favIds.filter(fav=> fav!== req.params.id)
    user = await user.save();
    res.send(user.favIds)
})

function validation(user){
    const schema = Joi.object({
        username: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(50).email().required(),
        password: Joi.string().min(5).max(50).required()
    });
    return schema.validate(user)

}




module.exports = router;