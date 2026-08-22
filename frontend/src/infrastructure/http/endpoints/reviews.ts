export const reviewEndpoints = { create: { method: 'POST', path: '/reviews' }, update: { method: 'PUT', path: '/reviews/{id}' }, remove: { method: 'DELETE', path: '/reviews/{id}' } } as const;
