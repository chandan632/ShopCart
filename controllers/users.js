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

function checklogin(req, res, next) {
    if (req.session.email == "admin@gmail.com" && req.session.name == "Admin") {
        next()
    } else {
        res.redirect("/login")
    }
}

router.get("/users", checklogin, async (req, res) => {
    try {
        const users = await User.find()
        const data = {
            title: "All Users",
            name: req.session.name,
            users
        }
        res.render("users", { data })
    } catch (err) {
        console.log(err)
    }
})

router.delete("/deleteuser/:id", checklogin, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete({ _id: req.params.id })
        if (!user) {
            throw new Error("No user found")
        } else {
            res.send("User Deleted")
        }
    } catch (err) {
        res.send("Something Went Wrong")
    }
})

module.exports = router