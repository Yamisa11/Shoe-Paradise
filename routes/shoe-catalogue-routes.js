import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default function ShoeCatalogueRoutes(shoeCatalogueService) {

    async function signupUser(req, res) {
        const { name, surname, address, phoneNumber, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10)

        shoeCatalogueService.signup(name, surname, address, phoneNumber, email, hashedPassword)

        res.redirect("/")
    }

    async function loginUser(req, res) {
        const { email, password } = req.body;

        if (!email && !password) {
            res.json({
                status: "error",
                error_message: "Please enter an email and password"
            })
        } else if (!email) {
            res.json({
                status: "error",
                error_message: "Please enter an email address"
            })
        } else if (!password) {
            res.json({
                status: "error",
                error_message: "Please enter a password"
            })
        } else {

            const userCheck = await shoeCatalogueService.userCheck(email)

            if (userCheck) {
                const passwordHash = await shoeCatalogueService.getPasswordHash(email);

                const passwordHashCheck = await bcrypt.compare(password, passwordHash);

                const username = await shoeCatalogueService.getUsername(email);

                if (passwordHashCheck) {

                    const token = jwt.sign({ email }, "shoe catalogue secret")

                    res.json({
                        status: "success",
                        token,
                        username,
                        email
                    })
                } else {
                    res.json({
                        status: "error",
                        error_message: "Password is incorrect"
                    })
                }
            } else {
                res.json({
                    status: "error",
                    error_message: "User does not exist"
                })
            }
        }
    }

    async function addToCart(req, res) {
        const email = req.body.email;
        const shoeId = req.body.shoeId;

        const cartExists = await shoeCatalogueService.checkExistingCart(email)

        if (!cartExists) {
            await shoeCatalogueService.createCart(email);

            const userId = await shoeCatalogueService.getUserId(email);

            const cartId = await shoeCatalogueService.getCartId(userId);

            await shoeCatalogueService.addItemToCart(cartId, shoeId)

            const cartItemsList = await shoeCatalogueService.getCartItemsList(cartId);

            res.json({
                cartTotal: cartItemsList.length
            })
        } else {

            const userId = await shoeCatalogueService.getUserId(email);

            const cartId = await shoeCatalogueService.getCartId(userId);

            await shoeCatalogueService.addItemToCart(cartId, shoeId)

            const cartItemsList = await shoeCatalogueService.getCartItemsList(cartId);

            res.json({
                cartTotal: cartItemsList.length
            })
        }
    }

    async function getCart(req, res) {
        const email = req.body.email;

        try {
            const userId = await shoeCatalogueService.getUserId(email);
            const cartId = await shoeCatalogueService.getCartId(userId);

            const cartItems = await shoeCatalogueService.getCartItemsList(cartId);

            res.json(cartItems);
        }

        catch (err) {
            res.json({
                status: "error",
                error: err.stack
            })
        }
    }

    async function removeFromCart(req, res) {
        const shoeId = req.params.id;
        const email = req.body.email;

        try {
            const userId = await shoeCatalogueService.getUserId(email);
            const cartId = await shoeCatalogueService.getCartId(userId);

            await shoeCatalogueService.removeItemFromCart(cartId, shoeId)

            const cartItemsList = await shoeCatalogueService.getCartItemsList(cartId);

            if (cartItemsList.length === 0) {
                await shoeCatalogueService.removeCompleteCart(cartId)
            }

            res.json({
                status: "success"
            })
        }

        catch (err) {
            res.json({
                status: "error",
                error: err.stack
            })
        }
    }

    async function removeCart(req, res) {
        const email = req.body.email;

        try {
            const userId = await shoeCatalogueService.getUserId(email);
            const cartId = await shoeCatalogueService.getCartId(userId);

            await shoeCatalogueService.removeCompleteCart(cartId);

            res.json({
                status: "success"
            })
        }

        catch (err) {
            res.json({
                status: "error",
                error: err.stack
            })
        }

    }

    async function updateCart(req, res) {
        const shoeId = req.params.id;
        const type = req.query.type;

        try {
            const userId = await shoeCatalogueService.getUserId(email);
            const cartId = await shoeCatalogueService.getCartId(userId);

            if (type === "increase") {
                await shoeCatalogueService.updateCartItemByIncrease(cartId, shoeId);
            } else if (type === "decrease") {
                await shoeCatalogueService.updateCartItemByDecrease(cartId, shoeId);
            }

            res.json({
                status: "success"
            })
        }

        catch (err) {
            res.json({
                status: "error",
                error: err.stack
            })
        }
    }

    return {
        signupUser,
        loginUser,
        addToCart,
        getCart,
        removeFromCart,
        removeCart,
        updateCart
    }
}