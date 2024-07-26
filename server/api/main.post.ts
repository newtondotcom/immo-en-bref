import { Octokit } from 'octokit';
import { FileCommit } from '~/types/types';
import fs from 'fs';

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const body = await readBody(event);
	const { name, data } = body;

	const commit_message = `Add article named: "${name}"`;

	const articles_path = 'articles';

	const data_base64 = Buffer.from(JSON.stringify(data)).toString('base64');

	// save the file to github
	const octokit = new Octokit({
		auth: 'YOUR-TOKEN'
	});
	const commit: FileCommit = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
		owner: config.GITHUB_USERNAME,
		repo: config.GITHUB_REPO,
		path: articles_path + name,
		message: commit_message,
		committer: {
			name: config.GITHUB_USERNAME,
			email: config.GITHUB_EMAIL
		},
		content: data_base64, // base64 encoded file content
		headers: {
			'X-GitHub-Api-Version': '2022-11-28'
		}
	});

	// save the file to the local filesystem
	const file_name = articles_path + name + '.json';
	await fs.writeFileSync(file_name, data);
	setResponseStatus(event, 200);
	return 'success';
});
