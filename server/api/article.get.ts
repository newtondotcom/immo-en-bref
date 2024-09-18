import fs from 'fs';

const articles_path = 'articles/';

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const name = query.name;
	try {
		const content = fs.readFileSync(articles_path + name + '.html', 'utf-8');

		setResponseStatus(event, 200);
		return content;
	} catch (error) {
		setResponseStatus(event, 404);
		return 'Not found';
	}
});
