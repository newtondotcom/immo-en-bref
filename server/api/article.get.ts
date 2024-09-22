import fs from 'fs';

import prisma from '../data/prisma';

const articles_path = 'articles/';

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const name = query.name;
    try {
        const article = await prisma.article.findUnique({
            where: {
                title: name,
            },
        });
        setResponseStatus(event, 200);
        return { article };
    } catch (error) {
        setResponseStatus(event, 404);
        console.error(error);
        return 'Not found';
    }
});
