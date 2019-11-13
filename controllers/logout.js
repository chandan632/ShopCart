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

router.get("/logout", async (req, res) => {
    await User.findOneAndUpdate({ email: req.session.email }, {
        $set: {
            active: "not-active"
        }
    })
    req.session.destroy()
    res.redirect("/login")
})

module.exports = router