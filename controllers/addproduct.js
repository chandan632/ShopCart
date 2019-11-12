const express = require("express")
const router = express.Router()
const session = require("express-session")
const Product = require("./../models/products")

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

router.post("/addproduct", checklogin, async (req, res) => {
    try {
        console.log(req.body)
        const product = new Product(req.body)
        product.save()
        res.send(product)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router
