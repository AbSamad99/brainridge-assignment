import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../../services/transaction/transaction.service';
import { AccountService } from '../../services/account/account.service';
import { Account } from '../../models/account.model';
import { debounceTime } from 'rxjs';
import { Transaction } from '../../models/transaction.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrl: './create-transaction.component.scss',
})
export class CreateTransactionComponent {
  accounts: Account[] = [];
  fromAccountId = this.fb.control('', Validators.required);
  toAccountId = this.fb.control('', Validators.required);
  amount = this.fb.control(0, Validators.required);
  description = this.fb.control('', [
    Validators.required,
    Validators.maxLength(100),
  ]);
  transactionForm: FormGroup = this.fb.group({
    fromAccountId: this.fromAccountId,
    toAccountId: this.toAccountId,
    amount: this.amount,
    description: this.description,
  });

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private accountService: AccountService,
    private router: Router
  ) {
    accountService.accounts$.subscribe((accs) => (this.accounts = accs));

    this.fromAccountId.valueChanges.subscribe((val) => {
      console.log(val);
      this.validateAmount();
      this.validateSameAccount();
    });
    this.toAccountId.valueChanges.subscribe((val) => {
      this.validateAmount();
      this.validateSameAccount();
    });
    this.amount.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.validateAmount();
    });
  }

  validateAmount() {
    const fromAccountId = this.fromAccountId.value || -1;
    const fromAccount = this.accounts.find(
      (acc) => acc.accountId == fromAccountId
    );
    const toAccountId = this.toAccountId.value || -1;
    const toAccount = this.accounts.find((acc) => acc.accountId == toAccountId);
    if (!fromAccount || !toAccount) return;
    const amount = this.amount.value || -1;
    if (fromAccount.balance - amount < 0 || toAccount.balance + amount > 10000)
      this.amount.setErrors({ invalidAmount: true });
    if (toAccount.balance + amount > 10000)
      this.amount.setErrors({ newBalanceExceeded: true });
  }

  validateSameAccount() {
    const fromAccountId = this.fromAccountId.value;
    const toAccountId = this.toAccountId.value;
    if (fromAccountId == toAccountId)
      this.toAccountId.setErrors({ sameAccount: true });
    else this.toAccountId.setErrors(null);
  }

  createTransaction() {
    if (this.transactionForm.valid) {
      const newTransaction: Transaction = {
        transactionsId: Math.floor(Math.random() * 10000),
        ...this.transactionForm.value,
      };

      this.transactionService.addTransaction(newTransaction);

      this.router.navigate(['/transaction']);
    } else {
      if (!this.fromAccountId.value) {
        this.fromAccountId.markAsTouched();
        this.fromAccountId.setErrors({ required: true });
      }
      if (!this.toAccountId.value) {
        this.toAccountId.markAsTouched();
        this.toAccountId.setErrors({ required: true });
      }
      if (!this.amount.value) {
        this.amount.markAsTouched();
        this.amount.setErrors({ min: true });
      }
      if (!this.description.value) {
        this.description.markAsTouched();
        this.description.setErrors({ required: true });
      }
    }
  }
}
