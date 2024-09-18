import fs from 'fs';
import { Octokit } from 'octokit';

const articles_path = 'articles/';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const query = getQuery(event);
    const name = query.name;
    try {
        const file_path = articles_path + name + '.html';

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
        } catch (error) {
            console.error(error);
            if (error.status !== 404) {
                throw error;
            }
        }

        // Delete the file from GitHub
        const commit_message = `Delete article named: "${name}"`;

        await octokit.request('DELETE /repos/{owner}/{repo}/contents/{path}', {
            owner: config.GITHUB_USERNAME,
            repo: config.GITHUB_REPO,
            path: file_path,
            message: commit_message,
            committer: {
                name: config.GITHUB_USERNAME,
                email: config.GITHUB_EMAIL,
            },
            sha: fileSha,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
            },
        });

        fs.unlinkSync(file_path);

        setResponseStatus(event, 200);
        return 'Deleted';
    } catch (error) {
        setResponseStatus(event, 404);
        console.error(error);
        return 'Not found';
    }
});
