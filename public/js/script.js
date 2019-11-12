const addproductform = document.querySelector(".addproductform")
const name = document.querySelector("#name")
const description = document.querySelector("#description")
const price = document.querySelector("#price")
const quantity = document.querySelector("#quantity")
const addproduct = document.querySelector(".addproduct")
const msg = document.querySelector("#msg")
const productmsg = document.querySelector(".productmsg")

if (price) {
    price.addEventListener("keydown", function (e) {
        if (e.keyCode >= 96 && e.keyCode <= 105 || e.keyCode == 8 || e.keyCode == 110) {
            return true
        } else {
            e.preventDefault()
            return false
        }
    })
}

if (quantity) {
    quantity.addEventListener("keydown", function (e) {
        if (e.keyCode >= 96 && e.keyCode <= 105 || e.keyCode == 8) {
            return true
        } else {
            e.preventDefault()
            return false
        }
    })
}

function showMsg(bg, message, msgbox) {
    msgbox.classList.add(bg)
    msgbox.innerHTML = message

    setTimeout(function () {
        msgbox.classList.remove(bg)
        msgbox.innerHTML = ""
    }, 1000)
}

if (addproductform) {
    addproductform.addEventListener("submit", function (e) {
        e.preventDefault()
        if (name.value.trim() == "") {
            name.focus()
            showMsg("bg-warning", "Name is required", msg)
            return false
        }
        else if (description.value.trim() == "") {
            description.focus()
            showMsg("bg-warning", "Description is required", msg)
            return false
        }
        else if (price.value.trim() == "") {
            price.focus()
            showMsg("bg-warning", "Price is required", msg)
            return false
        }
        else if (quantity.value.trim() == "") {
            quantity.focus()
            showMsg("bg-warning", "Quantity is required", msg)
            return false
        } else {
            $.ajax({
                type: "POST",
                url: "/addproduct",
                data: {
                    name: name.value,
                    description: description.value,
                    price: price.value,
                    quantity: quantity.value
                },
                beforeSend: function () {
                    addproduct.classList.add("disabled")
                    addproductform.onsubmit = function (e) {
                        e.preventDefault()
                    }
                },
                success: function (res) {
                    addproduct.classList.remove("disabled")
                    addproductform.reset()
                    showMsg("bg-success", "Product added", msg)
                    console.log(res)
                }
            })
        }
    })
}

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
        console.log(e.target.id)
        $.ajax({
            type: "DELETE",
            url: "/delete/" + e.target.id,
            data: {
                id: e.target.id
            },
            beforeSend: function () {
                e.target.classList.add("disabled")
                e.target.onclik = function (e) {
                    return false
                }
            },
            success: function (response) {
                e.target.parentElement.remove()
                showMsg("bg-success", "Product Deleted", productmsg)
            }
        })
    }
    else if (e.target.classList.contains("edit")) {
        console.log(e.target.id)
        const a = document.createElement("a")
        a.setAttribute("href", "/edit/" + e.target.id)
        a.click()
        const nodes = e.target.parentElement.childNodes
        const name = nodes[1].innerHTML
        const description = nodes[3].innerHTML
        const price = nodes[5].innerHTML
        const quantity = nodes[7].innerHTML
        console.log(name + " " + description + " " + price + " " + quantity)
        $.ajax({
            type: "PATCH",
            url: "/edit/" + e.target.id,
            data: {
                _id: e.target.id,
                name,
                description,
                price,
                quantity
            }
        })
    }
})

$(document).ready(function () {
    window.history.replaceState('', '', window.location.href)
});
