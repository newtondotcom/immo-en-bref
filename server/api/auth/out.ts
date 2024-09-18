import { defineEventHandler, useSession } from 'h3';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const session = await useSession(event, {
        password: config.ENCRYPTION_KEY,
    });
    try {
        await session.clear();
        sendNoContent(event, 200);
    } catch (e) {
        console.error(e);
        setResponseStatus(event, 401);
        return e.message;
    }
});
