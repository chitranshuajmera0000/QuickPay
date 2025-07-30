const express = require('express')
const zod = require('zod')
const { User, Account } = require('../db')
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../middleware');
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId;
const { JWT_SECRET } = require('../config');

const router = express.Router();
router.use(cors())
router.use(express.json())


const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
})

const updateBody = zod.object({
    username: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().optional(),
    firstName: zod.string().optional(),
})

router.post('/signup', async (req, res) => {
    const success = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const existingUser = await User.findOne({
        username: req.body.username
    })
    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    res.status(200).json({
        message: "User created successfully",
        token: token
    })
})

router.post('/signin', async (req, res) => {
    const success = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(200).json({
            message: "Incorrect Inputs",
            success: 'n'
        })
    }
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    })
    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)
        res.status(200).json({
            token: token,
            success: 'y'
        })
        return;
    }

    res.status(200).json({
        message: "Error while logging in",
        success: 'n'
    })
})

router.put('/', authMiddleware, async function (req, res) {
    const success = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information",
            success: 'n'
        })
    }
    let existingUser = null
    existingUser = await User.findOne({
        username: req.body.user.username
    })

    if (existingUser && existingUser._id.toString() !== req.body.user._id.toString()) {
        return res.status(200).json({
            message: "Email already taken / Incorrect inputs",
            success: 'n'
        });
    }
    
    
    await User.updateOne({
        _id: req.userId
    }, req.body.user)
    res.status(200).json({
        message: "Updated Successfully",
        success: 'y'
    })

})

router.get('/bulk', authMiddleware , async (req, res) => {

    const filter = req.query.filter || '';
    let users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        },]
    })
    users = users.map(user => {
        if (user._id.toString() !== req.userId.toString()) {
            return user;
        }
        return null
    }).filter(user => user != null)

    res.status(200).json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

router.get('/info' ,authMiddleware, async (req, res) => {
    const user = await User.findOne({
        _id: req.userId
    })
    const account = await Account.findOne({
        userId: req.userId
    })
    res.status(200).json({
        user: user,
        balance: account.balance.toFixed(2) // Ensure balance is a string with two decimal places
    })
})



module.exports = router;