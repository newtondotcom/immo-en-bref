import fs from 'fs';

const articles_path = 'articles/';
const extension = '.html';

export default defineEventHandler(async (event) => {
	try {
		let listDir = fs.readdirSync(articles_path);
		listDir = listDir.map((file) => {
			file = file.replace(extension, '');
			return file;
		});
		setResponseStatus(event, 200);
		return { listDir };
	} catch (error) {
		setResponseStatus(event, 404);
		return 'Not found';
	}
});
