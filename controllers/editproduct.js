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

router.get("/edit/:id", checklogin, async (req, res) => {
    console.log(req.params.id)
    const product = await Product.findById({ _id: req.params.id })
    console.log(product)
    const data = {
        title: "Edit Product",
        product
    }
    res.render("editproduct", { data })
})

router.post("/editproduct/:id", checklogin, async (req, res) => {
    try {
        console.log(req.body)
        const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body)

        if (product) {
            res.redirect("/products")
        } else {
            const product = await Product.findById({ _id: req.params.id })
            console.log(product)
            const data = {
                title: "Edit Product",
                product
            }
            res.render("editproduct", { data })
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports = router