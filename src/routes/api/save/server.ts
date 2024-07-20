import { json } from '@sveltejs/kit';
import {
	GITHUB_TOKEN,
	GITHUB_USERNAME,
	GITHUB_REPO,
	GITHUB_BRANCH,
	GITHUB_EMAIL
} from '$env/static/private';
import { Octokit } from 'octokit';

const articles_path = `static/`;

export async function POST({ request, cookies }) {
	const { name, data } = await request.json();

	const commit_message = `Add article named: "${name}"`;

	// save the file to github
	const octokit = new Octokit({
		auth: 'YOUR-TOKEN'
	});
	await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
		owner: GITHUB_USERNAME,
		repo: GITHUB_REPO,
		path: articles_path + name,
		message: commit_message,
		committer: {
			name: GITHUB_USERNAME,
			email: GITHUB_EMAIL
		},
		content: 'bXkgbmV3IGZpbGUgY29udGVudHM=', // base64 encoded file content
		headers: {
			'X-GitHub-Api-Version': '2022-11-28'
		}
	});

	// save the file to the local filesystem

	return json({ id }, { status: 201 });
}
