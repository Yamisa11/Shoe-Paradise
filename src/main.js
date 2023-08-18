const shoesDisplay = document.querySelector("section");

const shoeCatalogue = ShoeCatalogue();

shoeCatalogue.shoes.forEach(item => {

    const shoeContainer = document.createElement("div");
    const shoeImg = document.createElement("img");
    const shoeName = document.createElement("p");
    const shoeBrand = document.createElement("p");
    const shoePrice = document.createElement("p");
    const shoeStock = document.createElement("p");
    const addToCartBtn = document.createElement("button");
    const centeredBtnContainer = document.createElement("div");

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

    centeredBtnContainer.append(addToCartBtn);
    shoeContainer.append(shoeImg, shoeName, shoeBrand, shoePrice, shoeStock, centeredBtnContainer);
    shoesDisplay.append(shoeContainer)
})

const addBtnElem = document.querySelectorAll(".addToCartBtn");

addBtnElem.forEach(item => {


    item.addEventListener("click", () => {

        const shoeName = item.closest(".shoeContainer").children[1].innerText;

        shoeCatalogue.addToCart(shoeName)

        const shoeItem = item.closest(".shoeContainer").children[4];

        shoeCatalogue.shoes.forEach(item => {
            if(shoeName === item.name) {
                shoeItem.innerHTML = `<span>${item.in_stock} </span>in stock`;
            }
        })
    })
})