/**
 * Navigation-related type definitions
 */

import {Transaction} from './transaction';
import {Recipient} from './user';

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
