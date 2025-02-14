# Minimalist Banking App

## Running the application

1. Make sure you have `Node.js` installed on your machine.
2. Run `npm install` to install all dependencies.
3. Run `ng serve` or `npm start` to start the applicaiton.
4. Navigate to `http://localhost:4200/` in order to access the application.

## Application Features

1. **Angular Material UI:** Components are built using the Angular Material Library with custon SCSS classes when needed.
2. **Shared Module:** Shared module containing the custom button component used in other components. The custom button component input props which can be used to control the styling.
3. **Forms & Validation:**
   1. Forms to create accounts and money transfers using FormBuilder, Formgroups and FormControls. Using both built-in and custom validators to check for errors.
   2. Conditional rendering of submit button based on account type selected in account creation form.
4. **Services:** Services for both transactions and accounts.
5. **Routing:**
   - Routing using angular routing for 4 key routes
     1. `http://localhost:4200/account` - Displays a list of accounts and has options to create new accounts or go to the transactons route. You can filter the list based on owner name and account type.
     2. `http://localhost:4200/account/create` - Form to create new accounts
     3. `http://localhost:4200/transactions` - Displays the list of transactions and has options to create new transactions or go to the accounts route. You can filter the list based on description and account Id.
     4. `http://localhost:4200/transactions/create` - Form to transfer funds between accounts.
   - Angular router redirents to `/account` for all other routes.
6. **Lazy Loading:** Separate modules for accounts and transactions are loaded only when corresponding routes are visited.

## Important Notes

1. This application has been made with the deadline of **14th February 2025** in mind as was instructed by the hiring team at BrainRidge consulting. I was informed of this assessment on **12th February 2025**.
2. Due to the short deadline, more focus has been given to the **functionality** of the application over the design, hence the **minimalist** look.
3. The accounts and transactions are stored in browser local storage for the sake of persistence.
4. Due to the nature of Angular Material, I was not able to change to color of the radio button based on account type. I looked online extensively for a workaround but none of the suggested solutions seem to work.

## Application Usage Flow

1. Navigate to `http://localhost:4200/`, you will be automatically routed to `http://localhost:4200/account`. You will to see list of accounts if you've already create some previously.
2. Click on the "New Account" button to create new accounts. This button will navigate us to `/account/create`.
3. Create a new account being mindful of the validation checks.
4. Once you have at least two accounts, click on the "View Transactions" button to be routed to `http://localhost:4200/transactions`. This will show you an empty list on the first viewing.
5. Click on the "New Transaction" button to transfer funds between accounts. This button will navigate us to `http://localhost:4200/transaction/create`.
6. Select the accounts to transfer funds between, making sure you don't have any errors.
7. You should see your transaction in the list, You can filter the transactions based on the description you gave it or based on any of the account ids.
8. Back on the accounts page, if you click on any of the account ids, you will be routed to `http://localhost:4200/transactions?accountId=<clicked-id>`, which will automatically filter the transactions based on the account id you clicked on.
