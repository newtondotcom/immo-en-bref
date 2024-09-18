import fs from 'node:fs';
import { Octokit } from 'octokit';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const body = await readBody(event);
    const { name, data } = body;

    // PROTECT API ENDPOINT

    // Update on Github
    let commit_message = `Add asset named: "${name}"`;
    const assets_path = 'assets/images/';
    const file_path = assets_path + name;

    const data_base64 = Buffer.from(data).toString('base64');

    // save the file to GitHub
    const octokit = new Octokit({
        auth: config.GITHUB_TOKEN,
    });

    // Get the current file SHA
    let fileSha = null;
    try {
        const { data: existingFile } = await octokit.request(
            'GET /repos/{owner}/{repo}/contents/{path}',
            {
                owner: config.GITHUB_USERNAME,
                repo: config.GITHUB_REPO,
                path: file_path,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                },
            },
        );
        fileSha = existingFile.sha;
        if (existingFile.content) {
            commit_message = `Update article named: "${name}"`;
        }
    } catch (error) {
        if (error.status !== 404) {
            throw error;
        }
    }

    try {
        await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            owner: config.GITHUB_USERNAME,
            repo: config.GITHUB_REPO,
            path: file_path,
            message: commit_message,
            committer: {
                name: config.GITHUB_USERNAME,
                email: config.GITHUB_EMAIL,
            },
            content: data_base64,
            sha: fileSha,
        });
        // save the file to the local filesystem
        const file_name = assets_path + name + '.html';
        await fs.writeFileSync(file_name, data);
        setResponseStatus(event, 200);
        return 'success';
    } catch (error) {
        setResponseStatus(event, 500);
        console.error(error);
        return 'error';
    }
});
