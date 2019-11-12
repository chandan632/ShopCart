const express = require("express")
const router = express.Router()
const Cart = require("./../models/cart")
const Product = require("./../models/products")

router.post("/addtocart/:id", async (req, res) => {
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