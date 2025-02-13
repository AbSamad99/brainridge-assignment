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
  transactionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private accountService: AccountService,
    private router: Router
  ) {
    accountService.accounts$.subscribe((accs) => (this.accounts = accs));

    this.transactionForm = this.fb.group({
      fromAccountId: ['', Validators.required],
      toAccountId: ['', Validators.required],
      amount: [0, Validators.required],
      description: ['', Validators.required],
    });

    this.transactionForm.get('fromAccountId')?.valueChanges.subscribe(() => {
      this.validateAmount();
      this.validateSameAccount();
    });
    this.transactionForm.get('toAccountId')?.valueChanges.subscribe(() => {
      this.validateAmount();
      this.validateSameAccount();
    });
    this.transactionForm
      .get('amount')
      ?.valueChanges.pipe(debounceTime(300))
      .subscribe(() => {
        this.validateAmount();
      });
  }

  validateAmount() {
    const fromAccountId = this.transactionForm.get('fromAccountId')?.value;
    const fromAccount = this.accounts.find(
      (acc) => acc.accountId == fromAccountId
    );
    const toAccountId = this.transactionForm.get('toAccountId')?.value;
    const toAccount = this.accounts.find((acc) => acc.accountId == toAccountId);
    if (!fromAccount || !toAccount) return;

    const amount = this.transactionForm.get('amount')?.value;
    if (fromAccount.balance - amount < 0 || toAccount.balance + amount > 10000)
      this.transactionForm.get('amount')?.setErrors({ invalidAmount: true });
  }

  validateSameAccount() {
    const fromAccountId = this.transactionForm.get('fromAccountId')?.value;
    const toAccountId = this.transactionForm.get('toAccountId')?.value;
    if (fromAccountId == toAccountId)
      this.transactionForm.get('toAccountId')?.setErrors({ sameAccount: true });
    else this.transactionForm.get('toAccountId')?.setErrors(null);
  }

  createTransaction() {
    if (this.transactionForm.valid) {
      const newTransaction: Transaction = {
        transactionsId: Math.floor(Math.random() * 10000),
        ...this.transactionForm.value,
      };

      this.transactionService.addTransaction(newTransaction);

      this.router.navigate(['/transaction']);
    }
  }
}
