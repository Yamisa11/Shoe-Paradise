const cartItems = document.querySelector(".cart-items");
const cartItemsContainer = document.querySelector(".cart-items-container");

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

    if (!Array.isArray(cartItemsList.data)) {
        cartItems.innerHTML = "Your shopping cart is empty"
    } else {

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
        })

        const cartSummary = document.createElement("div");
        const summaryHeading = document.createElement("div");
        const hr = document.createElement("hr");
        const itemsSummary = document.createElement("div");
        const items = document.createElement("div");
        const divItems = document.createElement("div");
        const divTotal = document.createElement("div");
        const totalSummary = document.createElement("div");
        const totalText = document.createElement("div");
        const checkoutSummary = document.createElement("div");
        const clearCartBtn = document.createElement("div")
        const clearCartImg = document.createElement("img");
        const checkoutBtn = document.createElement("div");
        const checkoutText = document.createElement("div");
        const checkoutImg = document.createElement("img");
        const divCheckoutImg = document.createElement("div");

        cartSummary.className = "cart-summary";
        summaryHeading.id = "summary-heading";
        itemsSummary.className = "items-summary";
        totalSummary.className = "total-summary";
        checkoutSummary.className = "checkout-summary";
        clearCartBtn.id = "clear-cart-btn";
        checkoutBtn.id = "checkout-btn";

        summaryHeading.innerText = "Cart Summary";
        items.innerText = "Items";
        totalText.innerText = "Total";
        checkoutText.innerText = "Checkout";
        clearCartImg.src = "/images/icons/delete-icon.png";
        checkoutImg.src = "/images/icons/checkout-icon.png";

        itemsSummary.append(items, divItems);
        totalSummary.append(totalText, divTotal);

        clearCartBtn.append(clearCartImg);
        divCheckoutImg.append(checkoutImg);
        checkoutBtn.append(checkoutText, divCheckoutImg);

        checkoutSummary.append(clearCartBtn, checkoutBtn);

        cartSummary.append(summaryHeading, hr, itemsSummary, hr, totalSummary, checkoutSummary);

        cartItemsContainer.append(cartSummary);

        const totalSummaryElement = document.querySelector(".total-summary")
        const itemsSummaryElement = document.querySelector(".items-summary");

        totalSummaryElement.children[1].innerText = `R${cartTotal}`;
        itemsSummaryElement.children[1].innerText = cartItemsList.data.length;

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
            item.addEventListener("click", async () => {

                const shoeId = item.closest(".cart-item").dataset.shoeId;
                const email = JSON.parse(localStorage.getItem("user"))[1];

                try {
                    await axios.delete(`/cart/${shoeId}`, {
                        data: { email }
                    })

                    cartItems.innerHTML = "";
                    cartItemsContainer.innerHTML = "";
                    cartTotal = 0;
                    await displayCartItems();
                }

                catch (err) {
                    console.log(err.message)
                }

            })
        })

        const clearCartBtnElement = document.querySelector("#clear-cart-btn");

        clearCartBtnElement.addEventListener("click", async () => {

            const email = JSON.parse(localStorage.getItem("user"))[1];

            try {
                await axios.delete(`/cart`, {
                    data: { email }
                })

                cartItemsContainer.innerHTML = "";
                await displayCartItems();
            }

            catch (err) {
                console.log(err.message)
            }
        })
    }
}

await displayCartItems();

