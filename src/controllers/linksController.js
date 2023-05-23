import { createLinkServices, getLinkByIdServices, getLinkByShortUrlServices } from "../services/linksServices.js";

export async function deleteLinkById(req, res) {
    try {
        isTheRightUser = await findUrlByUserServices(req.params.id)
    }
    catch (err) {
        return console.log(err.message);
    }
}

export async function getLinkByShortUrl(req, res) {
    try {
        const urlData = await getLinkByShortUrlServices(req.params.shortUrl);
        if (urlData.lenght === 0) return res.sendStatus(404);
        res.status(200).send(urlData);
    }
    catch (err) {
        return console.log(err.message);
    }
}

export async function getLinkById(req, res) {
    try {
        const urlData = await getLinkByIdServices(req.params.id);
        if (urlData.lenght === 0) return res.sendStatus(404);
        res.status(200).send(urlData);
    }
    catch (err) {
        return console.log(err.message);
    }
}

export async function createLink(req, res) {
    try {
        //usar o services para as operações enviando o req
        const linkPost = await createLinkServices(req.body);
        res.status(201).send(linkPost.shortedLink);
    }
    catch (err) {
        return console.log(err.message);
    }
}