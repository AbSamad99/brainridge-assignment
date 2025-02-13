import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction } from '../../models/transaction.model';
import { AccountService } from '../account/account.service';
import { Account } from '../../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService implements OnInit {
  private transactionsSubject = new BehaviorSubject<Transaction[]>([
    // {
    //   transactionsId: Math.floor(Math.random() * 10000),
    //   amount: 1000,
    //   fromAccountId: 1,
    //   toAccountId: 2,
    //   description: 'Rent Payment',
    // },
    // {
    //   transactionsId: Math.floor(Math.random() * 10000),
    //   amount: 300,
    //   fromAccountId: 2,
    //   toAccountId: 1,
    //   description: 'Returning extra balance.',
    // },
  ]);
  transactions$ = this.transactionsSubject.asObservable();

  accounts: Account[] = [];

  constructor(private accountsService: AccountService) {
    const storedTransactionsString = localStorage.getItem('transactions');
    if (storedTransactionsString)
      this.transactionsSubject.next(JSON.parse(storedTransactionsString));
  }

  ngOnInit(): void {
    this.accountsService.accounts$.subscribe((val) => {
      this.accounts = val;
    });
  }

  addTransaction(transaction: Transaction) {
    const oldTransactions = this.transactionsSubject.value;
    const newTransactions = [...oldTransactions, transaction];
    this.transactionsSubject.next(newTransactions);
    localStorage.setItem('transactions', JSON.stringify(newTransactions));
    this.accountsService.updateBalance(
      transaction.fromAccountId,
      0 - transaction.amount
    );
    this.accountsService.updateBalance(
      transaction.toAccountId,
      transaction.amount
    );
  }
}
