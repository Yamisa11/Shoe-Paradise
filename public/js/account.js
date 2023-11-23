const editName = document.querySelector("#edit-name");
const editSurname = document.querySelector("#edit-surname");
const editPhoneNumber = document.querySelector("#edit-phone-number");
const editAddress = document.querySelector("#edit-address");

const nameField = document.querySelector("#name-field");
const surnameField = document.querySelector("#surname-field");
const phoneNumberField = document.querySelector("#phone-number-field");
const addressField = document.querySelector("#address-field");

editName.addEventListener("click", () => {
    if (editName.innerText === "edit") {
        editName.innerText = "save"
        nameField.removeAttribute("disabled")
        nameField.focus()
        nameField.classList.add("edit-state");
    } else {
        nameField.blur()
        editName.innerText = "edit";
        nameField.setAttribute("disabled", "");
        nameField.innerText = nameField.innerText;
        nameField.classList.remove("edit-state");
    }
})
editSurname.addEventListener("click", () => {
    if (editSurname.innerText === "edit") {
        editSurname.innerText = "save"
        surnameField.removeAttribute("disabled")
        surnameField.focus()
        surnameField.classList.add("edit-state");
    } else {
        surnameField.blur()
        editSurname.innerText = "edit";
        surnameField.setAttribute("disabled", "");
        surnameField.innerText = surnameField.innerText;
        surnameField.classList.remove("edit-state");
    }
})
editPhoneNumber.addEventListener("click", () => {
    if (editPhoneNumber.innerText === "edit") {
        editPhoneNumber.innerText = "save"
        phoneNumberField.removeAttribute("disabled")
        phoneNumberField.focus()
        phoneNumberField.classList.add("edit-state");
    } else {
        phoneNumberField.blur()
        editPhoneNumber.innerText = "edit";
        phoneNumberField.setAttribute("disabled", "");
        phoneNumberField.innerText = phoneNumberField.innerText;
        phoneNumberField.classList.remove("edit-state");
    }
})
editAddress.addEventListener("click", () => {
    if (editAddress.innerText === "edit") {
        editAddress.innerText = "save"
        addressField.removeAttribute("disabled")
        addressField.focus()
        addressField.classList.add("edit-state");
    } else {
        addressField.blur()
        editAddress.innerText = "edit";
        addressField.setAttribute("disabled", "");
        addressField.innerText = addressField.innerText;
        addressField.classList.remove("edit-state");
    }
})

history.replaceState({}, null, "/user/account");