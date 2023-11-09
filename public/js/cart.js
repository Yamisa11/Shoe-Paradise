
const cartItems = document.querySelector(".cart-items");
const totalSummary = document.querySelector(".total-summary")
const itemsSummary = document.querySelector(".items-summary");
let cartTotal = 0;

async function getCartItems() {
    try {
        const email = JSON.parse(localStorage.getItem("user"))[1];

        const data = await axios.post("/cart", {
            email
        })

        return data;
    }

    catch (error) {
        console.log(error)
    }
}

async function displayCartItems() {
    const cartItemsList = await getCartItems();

    cartItemsList.data.forEach(item => {

        const cartItem = document.createElement("div");
        const cartItemImage = document.createElement("div");
        const cartItemInfo = document.createElement("div");
        const cartItemPrice = document.createElement("div");
        const cartItemQuantity = document.createElement("div");
        const cartSizeAndColourItem = document.createElement("div");
        const removeFromCartBtn = document.createElement("div");
        const img = document.createElement("img");
        const name = document.createElement("p");
        const brand = document.createElement("p");
        const price = document.createElement("p");
        const size = document.createElement("p");
        const colour = document.createElement("p");
        const quantity = document.createElement("p");
        const quantitySelect = document.createElement("div");
        const quantityDecrease = document.createElement("div");
        const quantityIncrease = document.createElement("div");
        const quantityAmount = document.createElement("div");

        cartItem.className = "cart-item";
        cartItemImage.className = "cart-item-image";
        cartItemInfo.className = "cart-item-info";
        cartItemQuantity.className = "cart-item-quantity";
        cartItemPrice.className = "cart-item-price";
        cartSizeAndColourItem.className = "cart-size-colour-item";
        quantitySelect.className = "quantity-select";
        quantityDecrease.className = "decrease-qty";
        quantityIncrease.className = "increase-qty";
        removeFromCartBtn.className = "removeFromCartBtn";

        cartItem.dataset.shoeId = item.id;
        img.src = item.img_src;
        name.innerText = item.name;
        brand.innerText = item.brand;
        price.innerText = `R${item.price}`;
        size.innerHTML = `<span>Size: </span>${item.size}`;
        colour.innerHTML = `<span>Colour: </span>${item.colour}`;
        quantity.innerText = "Quantity";
        quantityAmount.innerText = "1";
        quantityDecrease.innerHTML = "&ndash;";
        quantityIncrease.innerText = "+";
        removeFromCartBtn.innerText = "REMOVE FROM CART";

        cartItemImage.append(img);
        cartSizeAndColourItem.append(size, colour);
        cartItemInfo.append(name, brand, cartSizeAndColourItem);
        quantitySelect.append(quantityDecrease, quantityAmount, quantityIncrease)
        cartItemQuantity.append(quantity, quantitySelect);
        cartItemPrice.append(price, removeFromCartBtn);

        cartItem.append(cartItemImage, cartItemInfo, cartItemQuantity, cartItemPrice);

        cartItems.append(cartItem);

        cartTotal += item.price;

        totalSummary.children[1].innerText = `R${cartTotal}`;

        
    })
    
    itemsSummary.children[1].innerText = cartItemsList.data.length;

    const increaseQtyBtn = document.querySelectorAll(".increase-qty");
    const decreaseQtyBtn = document.querySelectorAll(".decrease-qty");

    increaseQtyBtn.forEach(item => {

        item.addEventListener("click", () => {
            let qty = item.previousElementSibling.innerText;

            let updatedQty = Number(qty);

            updatedQty++;

            item.previousElementSibling.innerText = updatedQty;
        })
    })

    decreaseQtyBtn.forEach(item => {

        item.addEventListener("click", () => {
            let qty = item.nextElementSibling.innerText;

            let updatedQty = Number(qty);

            if (Number(qty) > 0) {
                updatedQty--;
            }

            item.nextElementSibling.innerText = updatedQty;

        })
    })

    const removeFromCartBtnElements = document.querySelectorAll(".removeFromCartBtn");

    removeFromCartBtnElements.forEach(item => {
        item.addEventListener("click", () => {

            console.log(item.closest(".cart-item").dataset.shoeId)
        })
    })
};

await displayCartItems();
