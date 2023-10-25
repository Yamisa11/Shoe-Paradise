const increaseQtyBtn = document.querySelector("#increase-qty");
const decreaseQtyBtn = document.querySelector("#decrease-qty");

increaseQtyBtn.addEventListener("click", () => {
    let qty = increaseQtyBtn.previousElementSibling.innerText;

    let updatedQty = Number(qty);

    updatedQty++;

    increaseQtyBtn.previousElementSibling.innerText = updatedQty;

})

decreaseQtyBtn.addEventListener("click", () => {
    let qty = decreaseQtyBtn.nextElementSibling.innerText;

    let updatedQty = Number(qty);

    if(Number(qty) > 0) {
        updatedQty--;
    }

    decreaseQtyBtn.nextElementSibling.innerText = updatedQty;

})