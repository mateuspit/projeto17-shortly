import { db } from "../database/database-connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

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