const shoesDisplay = document.querySelector("section");
const brandSelect = document.querySelector("#brandSelect");
const colourSelect = document.querySelector("#colourSelect");
const sizeSelect = document.querySelector("#sizeSelect");
const showAllBtn = document.querySelector("#showAllBtn");

var slideshows = document.querySelectorAll('[data-component="slideshow"]')

slideshows.forEach(initSlideShow);

function initSlideShow(slideshow) {

    var slides = document.querySelectorAll(`.slide`); // Get an array of slides

    var index = 0, time = 5000;
    slides[index].classList.add('active');  
    
    setInterval( () => {
      slides[index].classList.remove('active');
      
      //Go over each slide incrementing the index
      index++;
      
      // If you go over all slides, restart the index to show the first slide and start again
      if (index === slides.length) index = 0; 
      
      slides[index].classList.add('active');

    }, time);
  }

const shoeCatalogue = ShoeCatalogue();

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
}

displayShoes(shoeCatalogue.shoes)

brandSelect.addEventListener("change", shoeFilter)
colourSelect.addEventListener("change", shoeFilter)
sizeSelect.addEventListener("change", shoeFilter)

function shoeFilter() {

    shoesDisplay.innerHTML = "";

    const filteredShoeArr = shoeCatalogue.filterShoes(brandSelect.value, colourSelect.value, sizeSelect.value);

    if (filteredShoeArr.length === 0) {

        const p = document.createElement("p");
        p.innerText = "There are no shoes matching your criteria";
        p.classList.add("filterMsg")
        shoesDisplay.append(p)
        shoesDisplay.classList.add("centerFilterMsg")
    } else {
        displayShoes(filteredShoeArr);
        shoesDisplay.classList.remove("centerFilterMsg")
    }
}

showAllBtn.addEventListener("click", () => {
    shoesDisplay.innerHTML = "";
    displayShoes(shoeCatalogue.shoes)
    brandSelect.value = "default";
    colourSelect.value = "default";
    sizeSelect.value = "default";
})