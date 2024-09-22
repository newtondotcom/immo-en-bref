import prisma from '../data/prisma';

export default defineEventHandler(async (event) => {
    try {
        const list = await prisma.article.findMany({
            where: {
                deleted_at: null,
            },
        });
        setResponseStatus(event, 200);
        return { list };
    } catch (error) {
        setResponseStatus(event, 404);
        return 'Not found';
    }
});
