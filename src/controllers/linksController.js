import { createLinkServices } from "../services/linksServices.js";

export async function createLink(req, res) {
    try {
        //usar o services para as operações enviando o req
        const linkPost = await createLinkServices(req.bod);
        res.status(201).send(linkPost.shortedLink);
    }
    catch (err) {
        return console.log(err.message);
    }
}