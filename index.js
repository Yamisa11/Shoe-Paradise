import express from "express";
import { engine } from "express-handlebars";

const app = express();

const PORT = process.env.PORT || 3000;

app.engine("handlebars", engine({
    layoutsDir: "./views/layouts"
}));

app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/add", (req, res) => {
    res.render("addShoe")
})

app.get("/cart", (req, res) => {
    res.render("cart")
})

app.listen(PORT, () => console.log(`Server started at Port: ${PORT}`));