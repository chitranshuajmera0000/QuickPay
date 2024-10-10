const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const router = express.Router();
const mongoose = require('mongoose')
const cors = require('cors')

router.use(cors())
router.use(express.json())

router.get('/balance', authMiddleware, async function (req, res) {
    const account = await Account.findOne(
        {
            userId: req.userId
        }
    )
    res.status(200).json({
        balance: account.balance
    })
})

router.post('/transfer', authMiddleware, async function (req, res) {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { to, amount } = req.body
    const senderAccount = await Account.findOne({ userId: req.userId }).session(session)
    const receiverAccount = await Account.findOne({ userId: to }).session(session)

    if (!senderAccount || !receiverAccount) {
        await session.abortTransaction()
        return res.status(200).json({
            message: "Invalid Account",
            success: 'n'
        })
    }

    if (senderAccount.balance < amount || amount < 0 || !amount) {
        await session.abortTransaction();
        return res.status(200).json({
            message: "Insufficient Balance / Invalid Input",
            success: 'n'
        })
    }

    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session)
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session)

    await session.commitTransaction();
    res.status(200).json({
        message: "Transfer Successful",
        success: 'y'
    })

}
)
module.exports = router;