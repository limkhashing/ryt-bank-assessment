import { User, Recipient, Transaction, ApiResponse, TransactionStatus } from '../types';
import { Logger } from '../utils';

class TransferService {
  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      // TODO change this to actual API call
      const mockUser = require('../data/mockUser.json');
      const user = await this.simulateApiCall(mockUser);
      return { success: true, data: user };
    } catch (error) {
      Logger.error('Error fetching user data', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch user data',
      };
    }
  }

  async getRecipients(): Promise<ApiResponse<Recipient[]>> {
    try {
      // TODO change this to actual API call
      const mockRecipients = require('../data/mockRecipients.json');
      const recipients = await this.simulateApiCall(mockRecipients);
      return { success: true, data: recipients };
    } catch (error) {
      Logger.error('Error fetching recipients', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch recipients',
      };
    }
  }

  async processTransfer(transaction: Transaction): Promise<ApiResponse<Transaction>> {
    try {
      // Prepare mocked transaction response with status
      const isTransactionSuccess = true;
      const transactionWithStatus = {
        ...transaction,
        status: isTransactionSuccess ? TransactionStatus.COMPLETED : TransactionStatus.FAILED,
      };

      // TODO change this to actual API call
      const processedTransaction = await this.simulateApiCall(transactionWithStatus);

      return { success: true, data: processedTransaction };
    } catch (error) {
      Logger.error('Error processing transfer', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process transfer',
      };
    }
  }

  simulateApiCall = async <T>(data: T): Promise<T> => {
    const delay = Math.floor(Math.random() * 1000) + 500; // Random delay between 500-1500ms

    // Simulate network success/error using isRequestSuccess boolean flag
    const isRequestSuccess = false;
    if (!isRequestSuccess) {
      await new Promise(resolve => setTimeout(resolve, delay));
      throw new Error('Network error');
    }

    return new Promise(resolve => setTimeout(() => resolve(data), delay));
  }
}

export const transferService = new TransferService();
