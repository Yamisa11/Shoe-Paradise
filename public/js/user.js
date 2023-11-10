const logoutBtn = document.querySelector("#logout-btn");
const userMenu = document.querySelector("#user-menu span");

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    window.location.href = "/"
})

userMenu.innerText = JSON.parse(localStorage.getItem("user"))[0];

async function createCart(shoeId) {
    const email = JSON.parse(localStorage.getItem("user"))[1];

    try {
        const data = await axios.post("/user", {
            email,
            shoeId
        })

        return data;

    } catch (error) {
        console.log(error)
    }
}

async function getNumOfCartItems() {
    const email = JSON.parse(localStorage.getItem("user"))[1];
    try {
        const result = await axios.post("/cart", {
            email
        })

        return result.data.length;
    }

    catch (error) {
        console.log(error)
    }
}

(async function numOfCartItems() {

    if (await getNumOfCartItems() === undefined) {
        cartIconBadge.innerText = 0;
    } else {
        cartIconBadge.innerText = await getNumOfCartItems()
    }
})();
