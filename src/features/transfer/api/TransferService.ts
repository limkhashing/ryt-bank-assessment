import {simulateApiCall} from '../../../lib/apiClient';
import {Logger} from '../../../utils/Logger';
import {ApiResponse, Recipient, Transaction, TransactionStatus, User} from '../types';

class TransferService {
  // Add a property to store the latest user data with updated balance
  private latestUserData: User | null = null;

  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      // Simulate API call using Axios
      // In production, this would be replaced with a real API call:
      // const response = await apiClient.get('/users/current');
      // return { success: true, data: response.data };

      const mockUser = require('../data/mockUser.json');
      const user = await simulateApiCall('/users/current', mockUser, { method: 'GET' });

      // If we have updated user data with a modified balance, use that instead
      if (this.latestUserData) {
        return { success: true, data: this.latestUserData };
      }

      // First time loading, store the initial user data
      this.latestUserData = user;
      return { success: true, data: user };
    } catch (error) {
      Logger.error('Error fetching user data', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch user data',
      };
    }
  }

  // Add method to update user balance
  updateUserBalance(newBalance: number): void {
    if (this.latestUserData) {
      this.latestUserData = {
        ...this.latestUserData,
        balance: newBalance
      };
    }
  }

  async getRecipients(): Promise<ApiResponse<Recipient[]>> {
    try {
      // Simulate API call using Axios
      // In production: const response = await apiClient.get('/recipients');
      const mockRecipients = require('../data/mockRecipients.json');
      const recipients = await simulateApiCall('/recipients', mockRecipients, { method: 'GET' });
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
      // Prepare transaction data
      const transactionWithStatus = {
        ...transaction,
        status: TransactionStatus.PENDING,
      };

      // Simulate API call using Axios
      // In production: const response = await apiClient.post('/transactions', transactionWithStatus);
      const processedTransaction = await simulateApiCall(
        '/transactions',
        { ...transactionWithStatus, status: TransactionStatus.COMPLETED },
        { method: 'POST' },
      );

      return { success: true, data: processedTransaction };
    } catch (error) {
      Logger.error('Error processing transfer', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process transfer',
      };
    }
  }
}

export const transferService = new TransferService();
