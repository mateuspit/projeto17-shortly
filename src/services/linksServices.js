import { db } from "../database/database-connection.js";
import { nanoid } from 'nanoid'

export async function createLinkServices(url) {
    //id da url
    try {
        const shortedLink = nanoid(8);
        const postShortedLink = db.query(`INSERTO TO urls ("shortUrl", url) VALUES ($1, $2)`, [shortedLink, url]);
        return postShortedLink;
    }
    catch (err) {
        return console.log(err.message);
    }
}

export async function getLinkByIdServices(id) {
    try {
        const linkData = db.query(`SELECT id FROM url WHEN id=$1`, [id]);
        return linkData.rows[0];
    }
    catch (err) {
        return console.log(err.message);
    }
}