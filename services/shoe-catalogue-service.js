export default function ShoeCatalogueService(db) {

    async function signup(name, surname, address, phoneNumber, email, password) {

        const insertQuery = `INSERT INTO users (name, surname, address, phone_number, email, password) 
                            VALUES ($1, $2, $3, $4, $5, $6)`;
        await db.none(insertQuery, [name, surname, address, phoneNumber, email, password])
    }

    async function getPasswordHash(email) {
        const selectQuery = `SELECT password FROM users WHERE email = $1`;

        const result = await db.oneOrNone(selectQuery, [email])

        return result.password;
    }

    async function userCheck(email) {
        const selectQuery = `SELECT email FROM users WHERE email = $1`;

        const result = await db.oneOrNone(selectQuery, [email])

        if (result) {
            return true;
        } else {
            return false;
        }
    }

    async function getUsername(email) {
        const selectQuery = `SELECT name FROM users WHERE email = $1`;

        const result = await db.oneOrNone(selectQuery, [email]);

        return result.name;
    }

    async function getUserId(email) {
        const selectQuery = `SELECT id FROM users WHERE email = $1`;

        const result = await db.oneOrNone(selectQuery, [email])

        return result.id;
    }

    async function checkExistingCart(email) {
        const userId = await getUserId(email);

        const selectQuery = `SELECT * FROM cart WHERE user_id = $1`;

        const result = await db.oneOrNone(selectQuery, [userId])

        if (!result || result.status !== "Created") {
            return false;
        } else {
            return true;
        }
    }

    async function createCart(email) {
        const userId = await getUserId(email);

        const insertQuery = `INSERT INTO cart(user_id, status) VALUES ($1, 'Created')`;

        await db.none(insertQuery, [userId]);
    }

    async function addItemToCart(cartId, shoeId) {
        const insertQuery = `INSERT INTO cart_items(cart_id, shoe_id) VALUES ($1, $2)`;

        await db.none(insertQuery, [cartId, shoeId])
    }

    async function getCartId(userId) {
        const selectQuery = `SELECT id FROM cart WHERE user_id = $1`;

        const result = await db.oneOrNone(selectQuery, [userId]);

        return result.id;
    }

    return {
        signup,
        getPasswordHash,
        userCheck,
        getUsername,
        checkExistingCart,
        createCart,
        addItemToCart,
        getCartId,
        getUserId
    }
}