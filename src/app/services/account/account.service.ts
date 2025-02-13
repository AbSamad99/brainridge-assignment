import { Injectable, OnInit } from '@angular/core';
import { Account } from '../../models/account.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accountsSubject = new BehaviorSubject<Account[]>([]);
  accounts$ = this.accountsSubject.asObservable();

  constructor() {
    const storedAccountsString = localStorage.getItem('accounts');
    if (storedAccountsString)
      this.accountsSubject.next(JSON.parse(storedAccountsString));
  }

  addAccount(account: Account) {
    const oldAccounts = this.accountsSubject.value;
    const newAccounts = [...oldAccounts, account];
    localStorage.setItem('accounts', JSON.stringify(newAccounts));
    this.accountsSubject.next(newAccounts);
  }

  updateBalance(accountId: number, amount: number) {
    const newAccounts = this.accountsSubject.value.map((account) => {
      if (account.accountId == accountId)
        return { ...account, balance: account.balance + amount };
      return account;
    });
    localStorage.setItem('accounts', JSON.stringify(newAccounts));
    this.accountsSubject.next(newAccounts);
  }
}
