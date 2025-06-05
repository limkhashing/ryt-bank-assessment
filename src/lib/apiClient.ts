import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';

import {API_DELAYS} from '../components/constants';
import {Logger} from '../utils/Logger';

// Simulated base URL for mocked API
const BASE_URL = 'https://api.rytbank.mock';

/**
 * Base Axios instance configuration
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor for adding auth tokens or other headers
apiClient.interceptors.request.use(
  (config) => {
    // Can add authentication tokens here
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    Logger.error('API request error:', error);
    return Promise.reject(error);
  },
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { response } = error;

    if (response) {
      // Handle different response statuses (401, 403, 500, etc.)
      switch (response.status) {
        case 401:
          // Handle unauthorized
          break;
        case 404:
          // Handle not found
          break;
        case 500:
          // Handle server error
          break;
        default:
          // Handle other errors
          break;
      }
    } else {
      // Handle network errors
      Logger.error('Network error - no response received', error);
    }

    return Promise.reject(error);
  },
);

/**
 * For development/demo purposes:
 * Creates a simulated API call using Axios that mimics real API behavior
 */
export const simulateApiCall = async <T>(
  endpoint: string,
  mockData: T,
  config?: AxiosRequestConfig,
): Promise<T> => {
  // Random delay between 0.5 to 2 seconds for simulating network conditions
  const delay = Math.floor(Math.random() * (API_DELAYS.max - API_DELAYS.min)) + API_DELAYS.min;

  // Simulate API call by delaying the response
  await new Promise((resolve) => setTimeout(resolve, delay));

  // For simulation, we create a fake response from the mock data
  // In a real implementation this would be replaced with actual API calls

  // Simulate network success/error using shouldSucceed boolean flag
  // TODO you may change the value of shouldSucceed to false, to simulate API errors
  const shouldSucceed = true;

  if (!shouldSucceed) {
    throw new Error('Simulated API error');
  }

  // Log the simulated API call
  Logger.info(`[API Simulation] ${config?.method || 'GET'} ${endpoint}`, { delay });

  return mockData;
};

export default apiClient;
