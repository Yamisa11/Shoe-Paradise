const loginBtn = document.querySelector("#login-btn");
const signupBtn = document.querySelector("#signup-btn");
const loginFormContainer = document.querySelector(".login-form-container")
const signupFormContainer = document.querySelector(".signup-form-container");
const closeLoginForm = document.querySelector("#close-login-form")
const closeSignupForm = document.querySelector("#close-signup-form")
const overlay = document.querySelector(".modal-overlay")
const loginForm = document.querySelector(".login-form-container form")
const loginEmailInput = document.querySelector("#login-email");
const loginPasswordInput = document.querySelector("#login-password");
const errorMsg = document.querySelector("#error-msg");
const cartIconSection = document.querySelector(".cart-icon-section")

function showLoginForm() {
    overlay.classList.remove("hidden");
    loginFormContainer.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    errorMsg.innerText = "";
    loginEmailInput.value = "";
    loginPasswordInput.value = "";
}

loginBtn.addEventListener("click", showLoginForm)

signupBtn.addEventListener("click", () => {
    overlay.classList.remove("hidden");
    signupFormContainer.classList.remove("hidden");
    document.body.style.overflow = "hidden";
})

closeLoginForm.addEventListener("click", () => {
    overlay.classList.add("hidden");
    loginFormContainer.classList.add("hidden");
    document.body.style.overflow = "visible";
})

closeSignupForm.addEventListener("click", () => {
    overlay.classList.add("hidden");
    signupFormContainer.classList.add("hidden");
    document.body.style.overflow = "visible";
})

loginForm.addEventListener("submit", async (event) => {
    
    event.preventDefault();

    try {        
        const response = await axios.post("https://shoe-catalogue.onrender.com/login", {
            email:  loginEmailInput.value,
            password: loginPasswordInput.value
        })

        if (response.data.status === "error") {
            errorMsg.innerText = response.data.error_message;
        } else if(response.data.status = "success"){
            const token = response.data.token;
            const user = [response.data.username, response.data.email]
            localStorage.setItem("jwtToken", token)
            localStorage.setItem("user", JSON.stringify(user))
            window.location.href = "user";
        }
        
    } catch(error) {
        console.log(error)
    }
})

cartIconSection.addEventListener("click", () => {
    if (localStorage.getItem("jwtToken")) {
        window.location.href = "/cart";
    } else {
        showLoginForm();
    }
})