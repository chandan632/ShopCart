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
    if (e.target.classList.contains("deleteuser")) {
        console.log(e.target.id)
        $.ajax({
            type: "DELETE",
            url: "/deleteuser/" + e.target.id,
            data: {
                id: e.target.id
            },
            success: function (res) {
                if (res.trim() == "User Deleted") {
                    showmsg("bg-success", msgbox, res)
                    e.target.parentElement.remove()
                } else {
                    showmsg("bg-danger", msgbox, res)
                }
            }
        })
    }
})