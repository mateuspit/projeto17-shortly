import { createUserServices, loginServices } from "../services/usersServices.js";

export async function createUser(req, res) {
    try {
        //usar o services para as operações enviando o req
        const dataPost = await createUserServices(req.body);
        //caso user exista retornar erro
        if (dataPost === false) return res.sendStatus(409);
        //retornar o request positivo para o front através do res
        return res.sendStatus(201);
    }
    catch (err) {
        return console.log(err.message);
    }
}

export async function login(req, res) {
    try {
        //usar o services para realizar login enviando o req
        const loginSucess = await loginServices(req.body);
        if (loginSucess === false) return res.sendStatus(401);
        //retornar o request positivo para o front através do res

        return res.send(loginSucess.userToken);
    }
    catch (err) {
        return console.log(err.message);
    }
}