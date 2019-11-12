const express = require("express")
const router = express.Router()
const session = require("express-session")
const Cart = require("./../models/cart")
const Product = require("./../models/products")
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
    if (req.session.email != "admin@gmail.com" && req.session.email != undefined && req.session.name != "admin") {
        next()
    } else {
        res.redirect("/login")
    }
}

router.get("/buy/:id", checklogin, async (req, res) => {
    try {
        const cartproduct = await Cart.findOneAndDelete({ _id: req.params.id })
        const oldid = cartproduct.oldid
        const quantity = cartproduct.quantity
        const mainproduct = await Product.findByIdAndUpdate({ _id: oldid }, {
            $inc: {
                quantity: -quantity
            }
        }, { new: true })
        console.log(mainproduct)
        const date = new Date()
        const data = {
            buyer_name: req.session.name,
            buyer_email: req.session.email,
            name: cartproduct.name,
            price: cartproduct.price,
            quantity: cartproduct.quantity,
            totalprice: cartproduct.totalprice,
            date: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
            time: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        }
        const transaction = new Transaction(data)
        const savedtransaction = await transaction.save()
        console.log(savedtransaction)
        res.send("Product Purchased Succesfully")
    } catch (err) {
        console.log(err)
        res.send("Something Went Wrong")
    }
})

module.exports = router