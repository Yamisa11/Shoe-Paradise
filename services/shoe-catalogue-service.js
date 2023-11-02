export default function ShoeCatalogueService(db) {

    async function signup(name, surname, address, phoneNumber, email, password) {

        const insertQuery = `INSERT INTO users (name, surname, address, phone_number, email, password) 
                            VALUES ($1, $2, $3, $4, $5, $6)`;
        await db.none(insertQuery, [name, surname, address, phoneNumber, email, password])
    }

    async function getPasswordHash(email) {
        const selectQuery = `SELECT password FROM users WHERE email = $1`;

        const result =  await db.oneOrNone(selectQuery, [email])
        
        return result.password;
    }

    return {
        signup,
        getPasswordHash
    }
}