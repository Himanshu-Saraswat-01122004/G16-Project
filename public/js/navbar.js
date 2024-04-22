// search-box open close js code
let navbar = document.querySelector(".navbar");
let searchBox = document.querySelector(".search-box .bx-search");
// let searchBoxCancel = document.querySelector(".search-box .bx-x");

// Retrieve the access token from local storage
var accessToken = localStorage.getItem('G16-AcessToken');

// Check if the access token is available
if (accessToken) {
    // Use the access token for further processing
    console.log('Access token:', accessToken);

    // Find the element whose inner HTML you want to change
    let element = document.getElementById("change");
    element.innerHTML = "<a href = '#'><i class = 'bx bx-user'></i></a>"

    // // Create an anchor tag for the avatar with the desired URL
    // let avatarLink = document.createElement("a");
    // avatarLink.href = "/home"; // Replace "path_to_profile_page" with the actual URL
    // avatarLink.classList.add("avatar-link");

    // // Create the avatar image
    // let avatar = document.createElement("box-icon");
    // // avatar.src = "img/avatar.svg"; // Replace "path_to_avatar_image" with the actual path
    // // avatar.alt = "Avatar";
    // // avatar.classList.add("avatar-image");
    // avatar.name = "user";
    // avatar.classList.add("nav");
    // avatar.classList.add("bx-sm");
    // avatar.classList.add("bx");

    // // Append the avatar image to the anchor tag
    // avatarLink.appendChild(avatar);

    // // Replace the "login" button with the avatar link
    // let loginButton = document.querySelector(".login-btn");
    // loginButton.replaceWith(avatarLink);
} else {
    // Handle the case where the access token is not available
    console.log('Access token not found.');
}

searchBox.addEventListener("click", () => {
    navbar.classList.toggle("showInput");
    if (navbar.classList.contains("showInput")) {
        searchBox.classList.replace("bx-search", "bx-x");
    } else {
        searchBox.classList.replace("bx-x", "bx-search");
    }
});

// sidebar open close js code
let navLinks = document.querySelector(".nav-links");
let menuOpenBtn = document.querySelector(".navbar .bx-menu");
let menuCloseBtn = document.querySelector(".nav-links .bx-x");
menuOpenBtn.onclick = function () {
    navLinks.style.left = "0";
}
menuCloseBtn.onclick = function () {
    navLinks.style.left = "-100%";
}


// sidebar submenu open close js code
let htmlcssArrow = document.querySelector(".htmlcss-arrow");
htmlcssArrow.onclick = function () {
    navLinks.classList.toggle("show1");
}
let moreArrow = document.querySelector(".more-arrow");
moreArrow.onclick = function () {
    navLinks.classList.toggle("show2");
}
let jsArrow = document.querySelector(".js-arrow");
jsArrow.onclick = function () {
    navLinks.classList.toggle("show3");
}