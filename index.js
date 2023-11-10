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

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/add", (req, res) => {
    res.render("addShoe")
})

app.get("/cart", (req, res) => {
    res.render("cart")
})

app.post("/cart", shoeCatalogueRoutes.getCart)

app.get("/user", (req, res) => {
    res.render("user")
})

app.post("/user", shoeCatalogueRoutes.addToCart)

app.post("/login", shoeCatalogueRoutes.loginUser)

app.post("/signup", shoeCatalogueRoutes.signupUser)

app.delete("/cart/:id", shoeCatalogueRoutes.removeFromCart)

app.delete("/cart", shoeCatalogueRoutes.removeCart)

app.listen(PORT, () => console.log(`Server started at Port: ${PORT}`));