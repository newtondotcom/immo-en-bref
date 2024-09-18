import fs from 'fs';

const articles_path = 'articles/';

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const name = query.name;
    try {
        const filePath = articles_path + name + '.html';
        fs.unlinkSync(filePath);

        setResponseStatus(event, 200);
        return 'Deleted';
    } catch (error) {
        setResponseStatus(event, 404);
        console.error(error);
        return 'Not found';
    }
});
