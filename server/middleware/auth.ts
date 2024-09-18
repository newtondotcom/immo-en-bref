import { useSession } from 'h3';

export default eventHandler(async (event) => {
    const config = useRuntimeConfig();
    const session = await useSession(event, {
        password: config.ENCRYPTION_KEY,
    });

    // Define the routes and methods that are restricted
    const restrictedRoutes = [
        { method: 'POST', path: '/article' },
        { method: 'DELETE', path: '/article' },
        { method: 'POST', path: '/asset' },
        { method: 'GET', path: '/edit' },
    ];

    const { req } = event.node;
    const requestMethod = req.method;
    const requestUrl = req.url;

    // Check if the current route is restricted
    const isRestricted = restrictedRoutes.some(
        (route) => route.method === requestMethod && requestUrl.startsWith(route.path),
    );

    if (isRestricted) {
        if (session.data.seed && session.data.seed === config.SEED) {
            console.log('Authorized access:', requestUrl);
            return;
        }
        console.error('Unauthorized access attempt:', requestUrl);
        sendRedirect(event, '/auth');
    }
});
