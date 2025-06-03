/**
 * User-related type definitions
 */

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
