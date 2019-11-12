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
    if (e.target.classList.contains("deleteproduct")) {
        console.log(e.target.id)
        // console.log(e.target.parentElement.parentElement.remove())
        $.ajax({
            type: "delete",
            url: "/deletecartproduct/" + e.target.id,
            data: {
                id: e.target.id
            },
            success: function (response) {
                if (response.trim() == "Product Deleted") {
                    showmsg("bg-success", msgbox, response)
                    e.target.parentElement.parentElement.remove()
                }
                else if (response.trim() == "Something Went Wrong") {
                    showmsg("bg-danger", msgbox, response)
                }
            }
        })
    }
    else if (e.target.classList.contains("buy")) {
        console.log(e.target.id)
        $.ajax({
            type: "get",
            url: "/buy/" + e.target.id,
            data: {
                id: e.target.id
            },
            success: function (response) {
                if (response.trim() == "Product Purchased Succesfully") {
                    showmsg("bg-success", msgbox, response)
                    e.target.parentElement.parentElement.remove()
                } else if (response.trim() == "Something Went Wrong") {
                    showmsg("bg-warning", msgbox, response)
                }
            }
        })
    }
})