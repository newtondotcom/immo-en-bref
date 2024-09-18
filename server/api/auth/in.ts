import { defineEventHandler, readBody, useSession } from 'h3';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const adminPassword = config.PASSWORD_ADMIN;
    const adminUsername = config.ADMIN_USERNAME;
    const session = await useSession(event, {
        password: config.ENCRYPTION_KEY,
    });

    const body = await readBody(event);
    const password = body.password;
    const username = body.username;

    try {
        // Check if the username is correct
        if (username !== adminUsername) {
            throw new Error('Invalid username');
        }

        // Check if the password is correct
        if (password !== adminPassword) {
            throw new Error('Invalid password');
        }

        // Update the session with the hashed address
        await session.update({
            seed: config.SEED,
        });

        sendNoContent(event, 200);
    } catch (e) {
        await session.clear();
        console.error(e);
        setResponseStatus(event, 401);
        return e.message;
    }
});
