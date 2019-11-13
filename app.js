const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const session = require("express-session")
const addProduct = require("./controllers/addproduct")
const products = require("./controllers/products")
const deleteProduct = require("./controllers/deleteproduct")
const editProduct = require("./controllers/editproduct")
const signup = require("./controllers/signup")
const login = require("./controllers/login")
const logout = require("./controllers/logout")
const viewProduct = require("./controllers/viewproduct")
const addToCart = require("./controllers/addtocart")
const cartProduct = require("./controllers/cartproducts")
const buy = require("./controllers/buy")
const transaction = require("./controllers/transaction")
const user = require("./controllers/users")

const app = express()

const port = process.env.PORT || 3000

app.use(session({
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
    } else if (req.session.email != "admin@gmail.com" && req.session.email != undefined) {
        res.redirect("/viewproduct")
    } else {
        res.redirect("/login")
    }
}

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))
app.use('/static', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect("mongodb://localhost:27017/shopcartproject", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})


app.use(addProduct)
app.use(products)
app.use(deleteProduct)
app.use(editProduct)
app.use(signup)
app.use(login)
app.use(logout)
app.use(viewProduct)
app.use(addToCart)
app.use(cartProduct)
app.use(buy)
app.use(transaction)
app.use(user)

app.get("/", checklogin, (req, res) => {
    const data = {
        title: "Home Page",
        name: req.session.name
    }
    res.render("index", { data })
})

app.listen(port, () => {
    console.log(`server up on http://127.0.0.1:${port}`)
})