import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../../models/account.model';
import { AccountService } from '../../services/account/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
})
export class CreateAccountComponent {
  owner = this.fb.control('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(50),
  ]);
  balance = this.fb.control(0, [
    Validators.required,
    Validators.min(0),
    Validators.max(10000),
  ]);
  accountType = this.fb.control('chequing', Validators.required);
  accountForm: FormGroup = this.fb.group({
    owner: this.owner,
    balance: this.balance,
    accountType: this.accountType,
  });

  accountTypes = ['chequing', 'savings'];

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {}

  createAccount() {
    if (this.accountForm.valid) {
      const newAccount: Account = {
        accountId: Math.floor(Math.random() * 1000),
        ...this.accountForm.value,
      };
      this.accountService.addAccount(newAccount);
      this.router.navigate(['/account']);
    }
  }
}
