const loginbtn = document.querySelector("#login")
const signupbtn = document.querySelector("#signup")
const loginform = document.querySelector("#login-form")
const signupform = document.querySelector("#signup-form")
const loginlink = document.querySelector("#login-link")
const signuplink = document.querySelector("#signup-link")

if (loginlink) {

    loginlink.onclick = () => {
        signupform.classList.remove("d-block")
        signupform.classList.add("d-none")
        loginform.classList.remove("d-none")
        loginform.classList.add("d-block")
    }
}
if (signuplink) {
    signuplink.onclick = () => {
        loginform.classList.add("d-none")
        loginform.classList.remove("d-block")
        signupform.classList.add("d-block")
        signupform.classList.remove("d-none")
    }
}

const signupmsg = document.querySelector(".signupmsg")
if (signupmsg) {
    setTimeout(function () {
        signupmsg.parentElement.remove()
    }, 2000)
}