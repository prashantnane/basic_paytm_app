const express = require('express');
const mongoose = require('mongoose');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');

const router = express.Router();

router.get('/balance', authMiddleware, async function (req, res) {
    const account = await Account.findOne({
        userId: req.userId
    })

    res.json({
        balance: account.balance
    })
})

router.post('/transfer', authMiddleware, async function(req, res) {
    const session = await mongoose.startSession();

    session.startTransaction();
    const {amount , to} = req.body;

    const account = await Account.findOne({
        userId: req.userId
    }).session(session);

    if(!account || account.balance < amount) {
        return res.status(400).json({
            msg: "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({
        userId: to
    }).session(session);

    if(!toAccount) {
        return res.status(400).json({
            msg: "Invalid User"
        })
    }

    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {balance: -amount}
    }).session(session);

    await Account.updateOne({
        userId: to
    }, {
        $inc : {balance: amount}
    }).session(session)

    await session.commitTransaction();

    res.json({
        msg: "Transfer successful"
    })
})

module.exports = router;