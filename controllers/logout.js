const express = require("express")
const session = require("express-session")
const router = express.Router()

router.use(session({
    secret: "sdcvsiudvcoudsvocuvusvclsduvciudsbcoisdivcdsljcouv dxjld ",
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 3600000
    }
}))

router.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/login")
})

module.exports = router