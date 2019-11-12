const express = require("express")
const router = express.Router()
const session = require("express-session")
const User = require("./../models/users")

router.use(session({
    secret: "sdcvsiudvcoudsvocuvusvclsduvciudsbcoisdivcdsljcouv dxjld ",
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 3600000
    }
}))

router.get("/signup", (req, res) => {
    const data = {
        title: "Signup"
    }
    res.render("login-signup", { data })
})

router.post("/signup", async (req, res) => {
    try {
        if (req.body.email.trim() == "" || req.body.name.trim() == "" || req.body.password.trim() == "") {
            throw new Error("All field required")
        }
        const user = new User(req.body)
        await user.save()
        req.session.email = user.email
        req.session.name = user.name
        res.redirect("/viewproduct")

    } catch (err) {
        const data = {
            title: "Signup",
            error: "Something went wrong"
        }
        res.render("login-signup", { data })
    }
})

module.exports = router