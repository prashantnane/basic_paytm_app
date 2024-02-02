const express = require('express');
const zod = require('zod');
const jwt = require('jsonwebtoken');
const { User } = require('../db.js');
const { Account } = require('../db.js');
const {JWT_SECRET}  = require('../config.js');
const { authMiddleware } = require('../middleware.js');

const router = express.Router();

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.post('/signup', async function(req, res)  {
    const {success} = signupBody.safeParse(req.body);

    if(!success) {
        return res.status(411).json({
            msg: "Invalid inputs / User already exist"
        })
        
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser) {
        return res.status(411).json({
            msg: "User already exist"
        })
    }

    const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password
    })

    const userId = user._id;

    // creating account and initializing a random balance between 1 and 10000.
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        msg: "User created successfully",
        token: token
    });
})  

router.post('/signin', async function(req, res)  {
    const {success} = signinBody.safeParse(req.body);

    if(!success) {
        return res.status(411).json({
            msg: "Invalid inputs"
        })
        
    }

    const user = await User.findOne({
        userName: req.body.userName
    })

    if(user) {
        const userId = user._id;

        const token = jwt.sign({
            userId
        }, JWT_SECRET);

        res.json({
            token: token
        });

        return;
    }

    res.status(411).json({
        msg: "Error while logging in"
    })
    
})  

router.put('/', authMiddleware, async function(req, res) {
    const {success} = updateBody.safeParse(req.body);

    if(!success) {
        return res.status(403).json({
            msg: "Error while updating the information"
        })
    }

    await User.updateOne(req.body, {
        _id : req.userId,
        password: req.body.password
    })

    res.json({
        msg: "Updated successfully"
    })
})

module.exports = router;