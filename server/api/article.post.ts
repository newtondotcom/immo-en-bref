import fs from 'node:fs';
import { Octokit } from 'octokit';

import prisma from '../data/prisma';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const body = await readBody(event);
    const { name, data } = body;

    // Update on Github
    let commit_message = `Add article named: "${name}"`;
    const articles_path = 'articles/';
    const file_path = articles_path + name + '.html';

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
                ref: config.GITHUB_BRANCH,
            },
        );
        fileSha = existingFile.sha;
        if (existingFile.content) {
            commit_message = `Update article named: "${name}"`;
            if (fileSha === null) {
                throw new Error('File not found');
            }
        }
    } catch (error) {}

    try {
        await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            owner: config.GITHUB_USERNAME,
            repo: config.GITHUB_REPO,
            path: file_path,
            branch: config.GITHUB_BRANCH,
            message: commit_message,
            committer: {
                name: config.GITHUB_USERNAME,
                email: config.GITHUB_EMAIL,
            },
            content: data_base64,
            sha: fileSha || '',
        });
    } catch (error) {
        setResponseStatus(event, 500);
        console.error(error);
        return 'error';
    }

    await prisma.article.upsert({
        where: {
            title: name,
        },
        update: {
            content: data,
            date: new Date(),
        },
        create: {
            title: name,
            content: data,
        },
    });

    setResponseStatus(event, 200);
    return 'success';
});
