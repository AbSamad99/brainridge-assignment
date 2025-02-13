export interface Transaction {
  transactionsId: number;
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  description: string;
}
