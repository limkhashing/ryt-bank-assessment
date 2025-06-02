/**
 * API endpoint constants
 */

export const API_ENDPOINTS = {
  USER: {
    CURRENT: '/users/current',
    UPDATE: '/users/update',
  },
  RECIPIENTS: {
    LIST: '/recipients',
    ADD: '/recipients/add',
    REMOVE: '/recipients/remove',
  },
  TRANSACTIONS: {
    CREATE: '/transactions',
    LIST: '/transactions/list',
    DETAILS: (id: string) => `/transactions/${id}`,
  },
};
