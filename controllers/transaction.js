const express = require("express")
const router = express.Router()
const session = require("express-session")
const Transaction = require("./../models/transaction")

router.use(session({
    secret: "sdcvsiudvcoudsvocuvusvclsduvciudsbcoisdivcdsljcouv dxjld ",
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 3600000
    }
}))

function checklogin(req, res, next) {
    if (req.session.email == "admin@gmail.com" && req.session.name == "Admin") {
        next()
    } else {
        res.redirect("/login")
    }
}

router.get("/transaction", checklogin, async (req, res) => {
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