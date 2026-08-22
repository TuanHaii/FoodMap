/** Paths/methods copied from the supplied OpenAPI contract. */
export const authEndpoints = { register: { method: 'POST', path: '/auth/register' }, login: { method: 'POST', path: '/auth/login' }, refresh: { method: 'POST', path: '/auth/refresh' }, logout: { method: 'POST', path: '/auth/logout' }, user: { get: { method: 'GET', path: '/user' }, put: { method: 'PUT', path: '/user' } } } as const;
