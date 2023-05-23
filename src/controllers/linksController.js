import { createLinkServices, findUrlByIdServices, deleteLinkServices, getLinkByIdServices, getLinkByShortUrlServices, sameOwnerAnalyseServices } from "../services/linksServices.js";

export async function deleteLinkById(req, res) {
    try {
        const urlExist = await findUrlByIdServices(req.params.id);
        if (!urlExist) return res.sendStatus(401);
        const isTheRightUser = await sameOwnerAnalyseServices(req);
        if (!isTheRightUser) return res.sendStatus(401);
        const deletedLink = await deleteLinkServices(req.body.url);
        res.status(204).send(deletedLink)
    }
    catch (err) {
        return console.log(err.message);
    }
}

export async function getLinkByShortUrl(req, res) {
    try {
        const urlData = await getLinkByShortUrlServices(req.params.shortUrl);
        if (urlData.lenght === 0) return res.sendStatus(404);
        res.redirect(urlData);
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