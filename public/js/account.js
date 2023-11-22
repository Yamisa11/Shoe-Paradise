const editName = document.querySelector("#edit-name");
const editSurname = document.querySelector("#edit-surname");
const editPhoneNumber = document.querySelector("#edit-phone-number");
const editAddress = document.querySelector("#edit-address");

const nameField = document.querySelector("#name-field");
const surnameField = document.querySelector("#surname-field");
const phoneNumberField = document.querySelector("#phone-number-field");
const addressField = document.querySelector("#address-field");

async function getAccountDetails() {

    let email = "";

    if (localStorage.getItem("jwtToken")) {
        email = JSON.parse(localStorage.getItem("user"))[1];
    }

    try {
        const data = await axios.post("/user/account", {
            email
        })

        console.log(data)
    }

    catch (err) {
        console.log(err)
    }
}

(getAccountDetails)()

editName.addEventListener("click", () => {
    if (editName.innerText === "edit") {
        editName.innerText = "save"
        nameField.removeAttribute("disabled")
        nameField.focus()
    } else {
        nameField.blur()
        editName.innerText = "edit";
        nameField.setAttribute("disabled", "");
        nameField.innerText = nameField.innerText;
    }
})
editSurname.addEventListener("click", () => {
    if (editSurname.innerText === "edit") {
        editSurname.innerText = "save"
        surnameField.removeAttribute("disabled")
        surnameField.focus()
    } else {
        surnameField.blur()
        editSurname.innerText = "edit";
        surnameField.setAttribute("disabled", "");
        surnameField.innerText = surnameField.innerText;
    }
})
editPhoneNumber.addEventListener("click", () => {
    if (editPhoneNumber.innerText === "edit") {
        editPhoneNumber.innerText = "save"
        phoneNumberField.removeAttribute("disabled")
        phoneNumberField.focus()
    } else {
        phoneNumberField.blur()
        editPhoneNumber.innerText = "edit";
        phoneNumberField.setAttribute("disabled", "");
        phoneNumberField.innerText = phoneNumberField.innerText;
    }
})
editAddress.addEventListener("click", () => {
    if (editAddress.innerText === "edit") {
        editAddress.innerText = "save"
        addressField.removeAttribute("disabled")
        addressField.focus()
    } else {
        addressField.blur()
        editAddress.innerText = "edit";
        addressField.setAttribute("disabled", "");
        addressField.innerText = addressField.innerText;
    }
})