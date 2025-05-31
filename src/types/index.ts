export interface User {
  id: string;
  name: string;
  phoneNumber: string;
  balance: number;
}

export interface Recipient {
  id: string;
  name: string;
  phoneNumber?: string;
  isRecent?: boolean;
}

export interface Transaction {
  id: string;
  amount: number;
  recipient: Recipient;
  date: string;
  note?: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface TransferFormData {
  recipientId?: string;
  recipientName?: string;
  amount: number;
  note?: string;
}

export interface BiometricAuthResult {
  success: boolean;
  error?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export type RootStackParamList = {
  Transfer: undefined;
  SelectRecipient: {
    amount: number;
    note?: string;
  };
  Contacts: {
    amount: number;
    note?: string;
  };
  ConfirmTransfer: {
    amount: number;
    recipient: Recipient;
    note?: string;
  };
  Receipt: {
    transaction: Transaction;
  };
};