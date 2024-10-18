import prisma from '../data/prisma';

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
