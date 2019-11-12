const express = require("express")
const session = require("express-session")
const router = express.Router()
const User = require("./../models/users")

router.use(session({
    secret: "sdcvsiudvcoudsvocuvusvclsduvciudsbcoisdivcdsljcouv dxjld ",
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 3600000
    }
}))

router.get("/login", (req, res) => {
    const data = {
        title: "Login"
    }
    res.render("login-signup", { data })
})

router.post("/login", async (req, res) => {
    const email = req.body.login_email
    const password = req.body.login_password
    if (email == "admin@gmail.com" && password == "admin@123") {
        req.session.email = "admin@gmail.com"
        req.session.name = "Admin"
        res.redirect("/")
    } else {
        const user = await User.findOne({ email, password })
        if (!user) {
            const data = {
                title: "Login",
                error: "Something went wrong"
            }
            res.render("login-signup", { data })
        }
        else {
            console.log(user)
            req.session.email = user.email
            req.session.name = user.name
            res.redirect("/viewproduct")
        }
    }
})

module.exports = router