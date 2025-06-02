/**
 * Navigation-related type definitions
 */

import { Recipient } from './user';
import { Transaction } from './transaction';

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
