const express = require("express")
const router = express.Router()
const session = require("express-session")
const Cart = require("./../models/cart")

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

router.get("/cartproducts", checklogin, async (req, res) => {
    try {
        const cartproducts = await Cart.find({ buyer_email: req.session.email })
        const data = {
            title: "Cart Products",
            cartproducts,
            name: req.session.name
        }
        res.render("cartproduct", { data })
    } catch (err) {
        console.log(err)
    }
})

router.delete("/deletecartproduct/:id", checklogin, async (req, res) => {
    try {
        const pro = await Cart.findByIdAndDelete({ _id: req.params.id })
        if (!pro) {
            throw new Error("Error occured!")
        } else {
            res.send("Product Deleted")
        }
    } catch (err) {
        res.send("Something Went Wrong")
    }
})

module.exports = router