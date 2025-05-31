import { User, Recipient, Transaction, ApiResponse } from '../types';
import { simulateApiCall } from '../utils';

// Mock data
const mockUser: User = {
  id: 'user1',
  name: 'John Smith',
  balance: 5000.00,
};

const mockRecipients: Recipient[] = [
  { id: '1', name: 'Emma Watson', phoneNumber: '+6016-501 7727', isRecent: true },
  { id: '2', name: 'Elon Musk', phoneNumber: '+6012-320 3035', isRecent: true },
  { id: '3', name: 'Uzumaki Naruto', phoneNumber: '+6013-2612 329' },
];

class TransferService {
  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const user = await simulateApiCall(mockUser);
      return { success: true, data: user };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch user data',
      };
    }
  }

  async getRecipients(): Promise<ApiResponse<Recipient[]>> {
    try {
      const recipients = await simulateApiCall(mockRecipients);
      return { success: true, data: recipients };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch recipients',
      };
    }
  }

  async processTransfer(transaction: Transaction): Promise<ApiResponse<Transaction>> {
    try {
      // Simulate backend validation and processing
      const processedTransaction = await simulateApiCall({
        ...transaction,
        status: Math.random() > 0.1 ? 'completed' : 'failed', // 90% success rate
      });

      return { success: true, data: processedTransaction };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process transfer',
      };
    }
  }
}

export const transferService = new TransferService();
