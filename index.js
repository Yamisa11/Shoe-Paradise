import express from "express";
import { engine } from "express-handlebars";
import 'dotenv/config';
import pgPromise from 'pg-promise';

import ShoeCatalogueService from "./services/shoe-catalogue-service.js";
import ShoeCatalogueRoutes from "./routes/shoe-catalogue-routes.js";

const app = express();
const pgp = pgPromise({});

const connectionString = process.env.DATABASE_URL;
const db = pgp(connectionString)

const PORT = process.env.PORT || 3000;

app.engine("handlebars", engine({
    layoutsDir: "./views/layouts"
}));

app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static("public"))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const shoeCatalogueService = ShoeCatalogueService(db);
const shoeCatalogueRoutes = ShoeCatalogueRoutes(shoeCatalogueService);

app.get("/", async (req, res) => {
    let theRes = await shoeCatalogueService.getAll
    console.log(theRes)
    res.render("index")
})

app.get("/add", (req, res) => {
    res.render("addShoe")
})

app.get("/user", (req, res) => {
    res.render("user")
})

app.post("/user", shoeCatalogueRoutes.addToCart)

app.post("/login", shoeCatalogueRoutes.loginUser)

app.post("/signup", shoeCatalogueRoutes.signupUser)

app.get("/signup/success", (req, res) => {
    res.render("signup-success")
})

app.get("/cart", (req, res) => {
    res.render("cart")
})

app.post("/cart", shoeCatalogueRoutes.getCart)

app.delete("/cart/:id", shoeCatalogueRoutes.removeFromCart)

app.delete("/cart", shoeCatalogueRoutes.removeCart)

app.post("/cart/update/:id", shoeCatalogueRoutes.updateCart)

app.post("/cart/total", shoeCatalogueRoutes.getCartTotal)

app.post("/cart/checkout", shoeCatalogueRoutes.updateCartCheckout)

app.get("/cart/checkout/success", shoeCatalogueRoutes.checkoutSuccess)

app.get("/user/account", shoeCatalogueRoutes.accountDetails)

app.post("/user/account/update", shoeCatalogueRoutes.updateAccount)

app.get("/user/wishlist", shoeCatalogueRoutes.wishlist)

app.post("/user/wishlist", shoeCatalogueRoutes.addToWishlist)

app.post("/user/wishlist/update/:id", shoeCatalogueRoutes.updateWishlist)

app.get("/user/orders", shoeCatalogueRoutes.orderHistory)

app.listen(PORT, () => console.log(`Server started at Port: ${PORT}`));
