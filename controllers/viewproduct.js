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
    if (req.session.email != "admin@gmail.com" && req.session.email != undefined && req.session.name != "admin") {
        next()
    } else {
        res.redirect("/login")
    }
}

router.get("/viewproduct", checklogin, async (req, res) => {
    const products = await Product.find()
    const data = {
        title: "View product",
        products,
        name: req.session.name
    }
    res.render("viewproduct", { data })
})

module.exports = router