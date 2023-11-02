import bcrypt from 'bcrypt';

export default function ShoeCatalogueRoutes(shoeCatalogueService) {

    async function signupUser(req, res) {
        const { name, surname, address, phoneNumber, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10)

        shoeCatalogueService.signup(name, surname, address, phoneNumber, email, hashedPassword)

        res.redirect("/")
    }

    async function loginUser(req, res) {
        const { email, password } = req.body;

        const passwordHash = await shoeCatalogueService.getPasswordHash(email);

        const passwordHashCheck = await bcrypt.compare(password, passwordHash)

        if (passwordHashCheck) {
            res.render("user")
        } else {
            res.render("index")
        }

    }

    return {
        signupUser,
        loginUser
    }
}