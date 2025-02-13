import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { AccountService } from '../../services/account/account.service';
import { Account } from '../../models/account.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss',
})
export class TransactionComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  accounts: Account[] = [];

  filterDescription: string = '';
  filterAccountId?: number;

  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.transactionService.transactions$.subscribe(
      (trs) => (this.transactions = trs)
    );
    accountService.accounts$.subscribe((accs) => {
      this.accounts = accs;
      this.updateFilteredTransactions();
    });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((paramMap) => {
      const accId = paramMap.get('accountId');
      if (
        accId &&
        this.accounts.find((acc) => acc.accountId == Number(accId))
      ) {
        this.filterAccountId = Number(accId);
        this.updateFilteredTransactions();
      }
    });
  }

  updateParam(newValue: number | undefined) {
    if (newValue)
      this.router.navigate(['.'], {
        relativeTo: this.route,
        queryParams: { accountId: newValue },
      });
    else
      this.router.navigate(['.'], {
        relativeTo: this.route,
      });
  }

  updateFilteredTransactions() {
    this.filteredTransactions = this.transactions.filter((transaction) => {
      return (
        (this.filterDescription === '' ||
          transaction.description
            .toLowerCase()
            .includes(this.filterDescription.toLowerCase())) &&
        (this.filterAccountId === undefined ||
          transaction.fromAccountId === this.filterAccountId ||
          transaction.toAccountId === this.filterAccountId)
      );
    });
  }

  resetFilters() {
    this.filterDescription = '';
    this.filterAccountId = undefined;
    this.updateParam(this.filterAccountId);
    this.updateFilteredTransactions();
  }
}
