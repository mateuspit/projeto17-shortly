import { db } from "../database/database-connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function findAllVisitCountServices() {
    try {
        const allVisitCountData = await db.query(`SELECT users.id, users.name, COUNT(urls.id) AS "linksCount", SUM(urls."visitCount") AS "visitCount"
        FROM users
        JOIN urls ON users.id = urls."userId"
        GROUP BY users.id, users.name
        ORDER BY visitCount DESC
        LIMIT 10`);

        const usersWithLinksCount = allVisitCountData.rows[0].map(row => ({
            id: row.id,
            name: row.name,
            linksCount: row.linkscount,
            visitCount: row.visitcount
        }));
        return usersWithLinksCount;
    }
    catch (err) {
        return console.log(err.message);
    }
}

export async function getUrlsByIdServices(userId) {
    try {
        const urls = await db.query(`SELECT url FROM urls                                       
                                        WHERE "userId" = $1`, [userId])
        return urls.rows[0];
    }
    catch (err) {
        return console.log(err.message);
    }
}

export async function getUserDataServices(token) {
    try {
        const userData = await db.query(`SELECT id name "visitCount" FROM users                                       
                                        WHERE "tokenId" = $1`, [token.split(" ")[1].trim()])
        return userData.rows[0];
    }
    catch (err) {
        return console.log(err.message);
    }
}

export async function createUserServices(newUserData) {
    try {
        //crypt senha
        const cryptedPassword = bcrypt.hashSync(newUserData.password, 10);
        //deleta senha sem crypt
        delete newUserData.password;
        //add senha com crypto
        newUserData.password = cryptedPassword;
        //fazer a inserção no banco de dados
        const dataPosted = await db.query(`SELECT * FROM users`);
        if (dataPosted.rows.length === 0) return false;
        return dataPosted;
    }
    catch (err) {
        return console.log(err.message);
    }
}


export async function loginServices(loginDataUser) {
    try {
        //fazer conferencias junto ao banco de dados
        const loginData = await db.query(`SELECT * FROM users`);
        if (loginData.rows.length === 0) return false;
        //criando chave
        const userToken = uuid();
        //retornando chave
        loginData.rows.userToken = userToken;
        return loginData.rows;
    }
    catch (err) {
        return console.log(err.message);
    }
}