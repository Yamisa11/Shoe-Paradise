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

                if (passwordHashCheck) {

                    const token = jwt.sign({ email }, "shoe catalogue secret")

                    res.json({
                        status: "success",
                        token: token
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

            

    

    return {
        signupUser,
        loginUser
    }
}