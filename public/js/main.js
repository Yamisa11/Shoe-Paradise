const shoesDisplay = document.querySelector("section");
const brandSelect = document.querySelector("#brandSelect");
const colourSelect = document.querySelector("#colourSelect");
const sizeSelect = document.querySelector("#sizeSelect");
const showAllBtn = document.querySelector("#showAllBtn");
const cartIconBadge = document.querySelector(".cart-icon-badge");
const loginBtn = document.querySelector("#login-btn")
const loginFormContainer = document.querySelector(".login-form-container")
const signupBtn = document.querySelector("#signup-btn");
const signupFormContainer = document.querySelector(".signup-form-container");
const closeLoginForm = document.querySelector("#close-login-form")
const closeSignupForm = document.querySelector("#close-signup-form")
const overlay = document.querySelector(".modal-overlay")
const loginForm = document.querySelector(".login-form-container form")
const loginEmailInput = document.querySelector("#login-email");
const loginPasswordInput = document.querySelector("#login-password");
const errorMsg = document.querySelector("#error-msg");

var slideshows = document.querySelectorAll('[data-component="slideshow"]')

slideshows.forEach(initSlideShow);

function initSlideShow(slideshow) {

    var slides = document.querySelectorAll(`.slide`);

    var index = 0, time = 5000;
    slides[index].classList.add('active');

    setInterval(() => {
        slides[index].classList.remove('active');

        index++;

        if (index === slides.length) index = 0;

        slides[index].classList.add('active');

    }, time);
}

const shoeCatalogue = ShoeCatalogue();

async function getShoes() {

    try {
        const data = await axios.get('https://shoe-catalogue-api-au25.onrender.com/api/shoes');

        return data;
    }

    catch (err) {
        console.error(err)
    }
}

function skeletonLoader() {
    for (let i = 0; i < 21; i++) {
        const shoeContainer = document.createElement("div");
        shoeContainer.className = "shoeLoaderContainer";
        shoesDisplay.style.display = "flex";
        shoesDisplay.style.textAlign = "initial";
        shoesDisplay.append(shoeContainer)
    }
}

skeletonLoader()

let shoeDataArr;

async function getShoeData() {
    const shoeData = await getShoes();
    shoeDataArr = [...shoeData.data]
    shoesDisplay.innerHTML = "";
    displayShoes(shoeDataArr)
}

getShoeData();

function displayShoes(arr) {

    arr.forEach(item => {

        const shoeContainer = document.createElement("div");
        const shoeImg = document.createElement("img");
        const shoeName = document.createElement("p");
        const shoeBrand = document.createElement("p");
        const shoePrice = document.createElement("p");
        const shoeStock = document.createElement("p");
        const addToCartBtn = document.createElement("button");
        const centeredBtnContainer = document.createElement("div");

        shoeContainer.dataset.shoeId = item.id;
        shoeImg.src = item.img_src;
        shoeName.innerText = item.name;
        shoeBrand.innerText = item.brand;
        shoePrice.innerHTML = `<span>R</span>${item.price}`;
        shoeStock.innerHTML = `<span>${item.in_stock} </span>in stock`;
        addToCartBtn.innerText = "ADD TO CART";
        shoeName.style.color = "#333535";
        shoeBrand.style.color = "#8d8989";
        shoePrice.style.color = "#333535";
        addToCartBtn.style.border = "1px solid #333535";
        shoeStock.style.color = "#048c44";

        shoeContainer.className = "shoeContainer";
        shoeImg.className = "shoeImage";
        shoeStock.className = "shoeStock";
        addToCartBtn.className = "addToCartBtn";
        centeredBtnContainer.className = "centeredBtnContainer"

        shoesDisplay.style.display = "flex";
        shoesDisplay.style.textAlign = "initial";

        centeredBtnContainer.append(addToCartBtn);
        shoeContainer.append(shoeImg, shoeName, shoeBrand, shoePrice, shoeStock, centeredBtnContainer);
        shoesDisplay.append(shoeContainer)
    })

    const addBtnElem = document.querySelectorAll(".addToCartBtn");

    addBtnElem.forEach(item => {

        item.addEventListener("click", () => {

            const shoeName = item.closest(".shoeContainer").children[1].innerText;

            // shoeCatalogue.addToCart(shoeName)

            const shoeItem = item.closest(".shoeContainer").children[4];

            let cartItemsAdded = Number(cartIconBadge.innerText)

            if (Number(shoeItem.innerText[0]) !== 0) {
                cartItemsAdded++;
            }

            cartIconBadge.innerText = cartItemsAdded;

            // shoeCatalogue.shoes.forEach(item => {
            //     if (shoeName === item.name) {
            //         shoeItem.innerHTML = `<span>${item.in_stock} </span>in stock`;
            //     }
            // })

            req.params

            console.log(decodeURIComponent(document.cookie))

            Toastify({

                text: " Item added to cart",

                duration: 3000,

                avatar: "/images/icons/check.png",

                style: {
                    fontFamily: "'Oxygen', sans-serif"
                }
            }).showToast();

        })
    })
}

brandSelect.addEventListener("change", shoeFilter)
colourSelect.addEventListener("change", shoeFilter)
sizeSelect.addEventListener("change", shoeFilter)

async function shoeFilter() {

    shoesDisplay.innerHTML = "";

    const filteredShoeArr = await shoeCatalogue.filterShoes(brandSelect.value, colourSelect.value, sizeSelect.value);

    if (filteredShoeArr.length === 0) {
        const p = document.createElement("p");
        const img = document.createElement("img")
        const div = document.createElement("div");
        p.innerText = "There are no shoes matching your criteria";
        p.classList.add("filterMsg")
        img.src = "./images/icons/no-search-results.png";
        div.append(img)
        shoesDisplay.style.display = "block";
        shoesDisplay.style.textAlign = "center";
        shoesDisplay.append(p, div)
        shoesDisplay.classList.add("centerFilterMsg")
    } else {
        displayShoes(filteredShoeArr);
        shoesDisplay.classList.remove("centerFilterMsg")
    }
}

showAllBtn.addEventListener("click", () => {
    shoesDisplay.innerHTML = "";
    shoesDisplay.classList.remove("centerFilterMsg")
    displayShoes(shoeDataArr)
    brandSelect.value = "default";
    colourSelect.value = "default";
    sizeSelect.value = "default";
})

loginBtn.addEventListener("click", () => {
    overlay.classList.remove("hidden");
    loginFormContainer.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    errorMsg.innerText = "";
    loginEmailInput.value = "";
    loginPasswordInput.value = "";
})

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

loginForm.addEventListener("submit", (event) => {
    
    event.preventDefault();

    if (!loginEmailInput.value && !loginPasswordInput.value) {
        errorMsg.innerText = "Please enter a username and a password";
    } else if (!loginEmailInput.value) {
        errorMsg.innerText = "Please enter a username";
    } else if (!loginPasswordInput.value) {
        errorMsg.innerText = "Please enter a password";
    }
})