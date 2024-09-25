
let menuList = document.getElementById("menuList");
let closeIcon = document.getElementById("close");
let menuIcon = document.querySelector(".fa-bars");

menuList.style.maxHeight = "0px";

function toggleMenu() {
    if (menuList.style.maxHeight === "0px") {
        menuList.style.maxHeight = "450px";
        menuIcon.style.display = "none"; // Hide the bars icon
        closeIcon.style.display = "inline"; // Show the close icon
    } else {
        menuList.style.maxHeight = "0px";
        menuIcon.style.display = "inline"; // Show the bars icon
        closeIcon.style.display = "none"; // Hide the close icon
    }
}












