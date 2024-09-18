import fs from 'fs';

const articles_path = 'articles/';

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const name = query.name;
	try {
		const filePath = articles_path + name + '.html';
		const content = fs.readFileSync(filePath);
		const stats = fs.statSync(filePath);
		const lastModifiedTime = new Date(stats.mtime);

		setResponseStatus(event, 200);
		return { content, date: lastModifiedTime };
	} catch (error) {
		setResponseStatus(event, 404);
		return 'Not found';
	}
});
