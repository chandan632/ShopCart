const addtocartform = document.querySelector("#addtocartform")
const numberofproducts = document.querySelectorAll("#numberofproduct")
const msgbox = document.querySelector(".msg")

function showmsg(bg, element, msg) {
    element.classList.add(bg)
    element.innerHTML = msg
    setTimeout(() => {
        element.classList.remove(bg)
        element.innerHTML = ""
    }, 2000)
}

document.addEventListener("click", e => {
    if (e.target.classList.contains("submit")) {
        e.target.parentElement.addEventListener("submit", event => {
            event.preventDefault()
            const num = event.target.parentElement.childNodes[7].childNodes[1].value
            console.log(e.target.id)
            $.ajax({
                type: "POST",
                url: "/addtocart/" + e.target.id,
                data: {
                    id: e.target.id,
                    num
                },
                success: function (response) {
                    if (response.trim() == "Something Went Wrong") {
                        showmsg("bg-danger", msgbox, response)
                    }
                    else if (response.trim() == "Product Added") {
                        numberofproducts.forEach(numberofproduct => {
                            if (numberofproduct.classList.contains(e.target.id)) {
                                numberofproduct.value = ""
                            }
                        })
                        showmsg("bg-success", msgbox, response)
                    }
                }
            })
        })
    }
})
addtocartform.addEventListener("submit", e => {
    e.preventDefault()
    console.log(e.target.parentElement.childNodes[7].childNodes[1].value)
    if (numberofproduct.value.trim() == "") {
        addtocartform.focus()
        return false
    }
})