import { Component } from '@angular/core';
import { TransactionService } from '../../services/transaction/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { AccountService } from '../../services/account/account.service';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss',
})
export class TransactionComponent {
  transactions: Transaction[] = [];
  accounts: Account[] = [];

  filterDescription: string = '';
  filterFromAccountId?: number;
  filterToAccountId?: number;

  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService
  ) {
    this.transactionService.transactions$.subscribe(
      (trs) => (this.transactions = trs)
    );
    accountService.accounts$.subscribe((accs) => (this.accounts = accs));
  }

  filteredTransactions(): Transaction[] {
    return this.transactions.filter((transaction) => {
      return (
        (this.filterDescription === '' ||
          transaction.description
            .toLowerCase()
            .includes(this.filterDescription.toLowerCase())) &&
        (this.filterFromAccountId === undefined ||
          transaction.fromAccountId === this.filterFromAccountId) &&
        (this.filterToAccountId === undefined ||
          transaction.toAccountId === this.filterToAccountId)
      );
    });
  }

  resetFilters() {
    this.filterDescription = '';
    this.filterFromAccountId = undefined;
    this.filterToAccountId = undefined;
  }
}
