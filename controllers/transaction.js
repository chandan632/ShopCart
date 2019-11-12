const express = require("express")
const router = express.Router()
const Transaction = require("./../models/transaction")

router.get("/transaction", async (req, res) => {
    try {
        const transactions = await Transaction.find()
        const data = {
            title: "Transaction",
            name: "Admin",
            transactions
        }
        res.render("transaction", { data })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router