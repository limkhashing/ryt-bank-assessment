import { API_DELAYS } from '../constants';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const generateTransactionId = (): string => {
  return `TXN${Date.now()}${Math.random().toString(36).slice(2, 7)}`.toUpperCase();
};

export const simulateApiCall = async <T>(data: T): Promise<T> => {
  const delay = Math.random() * (API_DELAYS.max - API_DELAYS.min) + API_DELAYS.min;
  
  // Simulate network errors ~10% of the time
  if (Math.random() < 0.1) {
    await new Promise(resolve => setTimeout(resolve, delay));
    throw new Error('Network error');
  }

  return new Promise(resolve => setTimeout(() => resolve(data), delay));
};