import fs from 'fs';

const articles_path = 'articles/';

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const name = query.name;

	const content = fs.readFileSync(articles_path + name + '.json', 'utf-8');
	const json = JSON.parse(content);

	setResponseStatus(event, 200);
	return json;
});
