import { User, Recipient, Transaction, ApiResponse } from '../types';

class TransferService {
  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const mockUser = require('../data/mockUser.json');
      const user = await this.simulateApiCall(mockUser);
      return { success: true, data: user };
    } catch (error) {
      console.error('Error fetching user data:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch user data',
      };
    }
  }

  async getRecipients(): Promise<ApiResponse<Recipient[]>> {
    try {
      const mockRecipients = require('../data/mockRecipients.json');
      const recipients = await this.simulateApiCall(mockRecipients);
      return { success: true, data: recipients };
    } catch (error) {
      console.error('Error fetching recipients:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch recipients',
      };
    }
  }

  async processTransfer(transaction: Transaction): Promise<ApiResponse<Transaction>> {
    try {
      // Prepare transaction with status before simulation
      const transactionWithStatus = {
        ...transaction,
        status: Math.random() > 0.2 ? 'completed' : 'failed', // 80% success rate
      };

      // Use the class method to simulate API call
      const processedTransaction = await this.simulateApiCall(transactionWithStatus);

      return { success: true, data: processedTransaction };
    } catch (error) {
      console.error('Error processing transfer:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process transfer',
      };
    }
  }

  simulateApiCall = async <T>(data: T): Promise<T> => {
    const delay = Math.floor(Math.random() * 1000) + 500; // Random delay between 500-1500ms

    // Randomly decide between success and failure (80% success rate)
    if (Math.random() > 0.8) {
      await new Promise(resolve => setTimeout(resolve, delay));
      throw new Error('Network error');
    }

    return new Promise(resolve => setTimeout(() => resolve(data), delay));
  }
}

export const transferService = new TransferService();
