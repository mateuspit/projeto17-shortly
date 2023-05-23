import { db } from "../database/database-connection.js";
import { nanoid } from 'nanoid'

export async function findUrlByIdServices(id) {
    try {
        const urlExists = db.query(`SELECT url FROM urls WHERE "userId"=$1`, [id]);
        if (urlExists.rows[0].lenght === 0) return false;
        return true;
    } catch (err) {
        return console.log(err.message);
    }

}

export async function sameOwnerAnalyseServices(req) {
    try {
        const existLinkById = await db.query(`SELECT id FROM users
                                            JOIN urls ON users.id = "userId".urls
                                            WHERE "url" = $1`, [req.body.url]);
        if (req.params.id !== existLinkById.rows[0].id) return false;
        return true;
    }
    catch (err) {
        return console.log(err.message);
    }
}

export async function getLinkByShortUrlServices(shortUrl) {
    try {
        const linkData = await db.query(`SELECT id, "shortUrl", "url" FROM url WHERE "shortUrl"=$1`, [shortUrl]);
        await db.query(`UPDATE urls SET "visitCount" = "visitCount" + 1`);
        return linkData.rows[0];
    }
    catch (err) {
        return console.log(err.message);
    }
}

export async function createLinkServices(url) {
    //id da url
    try {
        const shortedLink = nanoid(8);
        const postShortedLink = await db.query(`INSERTO TO urls ("shortUrl", url, "visitCount") VALUES ($1, $2, 1)`, [shortedLink, url]);
        return postShortedLink;
    }
    catch (err) {
        return console.log(err.message);
    }
}

export async function getLinkByIdServices(id) {
    try {
        const linkData = await db.query(`SELECT id, "shortUrl", "url" FROM url WHERE id=$1`, [id]);
        await db.query(`UPDATE urls SET "visitCount" = "visitCount" + 1`);
        return linkData.rows[0];
    }
    catch (err) {
        return console.log(err.message);
    }
}