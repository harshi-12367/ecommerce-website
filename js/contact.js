document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name && email && message) {
        alert("Thank you for contacting us, " + name + "! We'll get back to you soon.");
        this.reset();
    } else {
        alert("Please fill out all fields.");
    }
});
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mainNav = document.querySelector(".main-nav ul");

mobileMenuBtn.addEventListener("click", () => {
    mainNav.classList.toggle("active");
});
