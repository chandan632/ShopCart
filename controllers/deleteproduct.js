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

router.delete("/delete/:id", checklogin, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete({ _id: req.params.id })
        console.log(product)
        res.send(product)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router