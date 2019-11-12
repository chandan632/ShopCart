const express = require("express")
const router = express.Router()
const session = require("express-session")
const Cart = require("./../models/cart")
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

router.post("/addtocart/:id", checklogin, async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.params.id)
        const product = await Product.findOne({ _id: req.params.id })
        console.log(product)
        const quantity = product.quantity - req.body.num
        console.log(quantity)
        if (quantity < 0) {
            throw new Error("Product not available")
        }
        const data = {
            buyer_email: req.session.email,
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: req.body.num,
            totalprice: product.price * req.body.num,
            oldid: product._id
        }
        console.log(data)
        const cartproduct = new Cart(data)
        const savedcartproduct = await cartproduct.save()
        console.log(savedcartproduct)
        res.send("Product Added")
    } catch (err) {
        console.log(err)
        res.send("Something Went Wrong")
    }
})

module.exports = router