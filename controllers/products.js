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

router.get("/products", checklogin, async (req, res) => {
    try {
        const products = await Product.find()
        const data = {
            title: "Products",
            products,
            name: req.session.name
        }
        res.render("products", { data })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router