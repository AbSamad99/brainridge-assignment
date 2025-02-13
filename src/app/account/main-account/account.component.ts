import { Component } from '@angular/core';
import { Account } from '../../models/account.model';
import { AccountService } from '../../services/account/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  accounts: Account[] = [];

  accountTypes: { id: number; label: string }[] = [
    { id: 1, label: 'savings' },
    { id: 2, label: 'chequing' },
  ];

  owner: string = '';
  accountTypeFilter: string = '';

  constructor(private accountService: AccountService, private router: Router) {
    this.accountService.accounts$.subscribe((acc) => (this.accounts = acc));
  }

  getFilteredAccounts() {
    return this.accounts.filter((acc) => {
      return (
        (this.owner == '' ||
          acc.owner.toLowerCase().includes(this.owner.toLowerCase())) &&
        (!this.accountTypeFilter ||
          this.accountTypeFilter == '' ||
          acc.accountType == this.accountTypeFilter)
      );
    });
  }

  resetFilters(): void {
    this.owner = '';
    this.accountTypeFilter = '';
  }
}
