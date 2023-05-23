import { db } from "../database/database-connection.js";
import { nanoid } from 'nanoid'

export async function createLinkServices(url) {
    //id da url
    const shortedLink = nanoid(8);
    const postShortedLink = db.query(`INSERTO TO "shortUrl" VALUES $1`, [shortedLink]);
    return postShortedLink;
}