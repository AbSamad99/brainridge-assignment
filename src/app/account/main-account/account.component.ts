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

  constructor(private accountService: AccountService, private router: Router) {
    this.accountService.accounts$.subscribe((acc) => (this.accounts = acc));
  }
}
