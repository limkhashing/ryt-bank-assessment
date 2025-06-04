/**
 * Transaction-related type definitions
 */

import {Recipient} from './user';

export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface Transaction {
  id: string;
  amount: number;
  recipient: Recipient;
  date: string;
  note?: string;
  status: TransactionStatus;
}
