#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk"
import { NumberModule, faker, tr } from "@faker-js/faker"



class Customer {
   name: string;
   customerId: NumberModule;
   contactNo: number;
   balance: number;
   accountNo: number;
    constructor(name: string, customerId: NumberModule, contactNo: number, balance: number = 0, accountNo: number) {
      this.name = name;
      this.customerId = customerId
      this.contactNo = contactNo;
      this.balance = balance;
      this.accountNo = accountNo;
    }
  
    getBalance(): number {
      return this.balance;
    }
  
    deposit(amount: number): void {
      if (amount > 0) {
        this.balance += amount;
        console.log(`Deposited: $${amount}`);
      } else {
        console.log('Invalid deposit amount.');
      }
    }
  
    withdraw(amount: number): void {
      if (amount > 0 && amount <= this.balance) {
        this.balance -= amount;
        console.log(`Withdrawn: $${amount}`);
      } else {
        console.log('Invalid withdrawal amount or insufficient balance.');
      }
    }

    getCustomerId(customerId: string){
      return `Customer ID : ${this.customerId}, ${this.name}, ${this.contactNo}, ${this.balance} \n`
    }
  }
  
  interface BankAccount {
    accountNo: number,
    balalnce: number,
}

class Bank{
  customer: Customer[] = []
  account: BankAccount[] = []

  addCustomer(obj: Customer){
    this.customer.push(obj)
  }

  addAccountNo(obj: BankAccount){
    this.account.push(obj)
  }

  transaction(accObj: BankAccount){
    let newAccount = this.account.filter((acc) => acc.accountNo !== accObj.accountNo)
    this.account = [...newAccount, accObj]
  }
}


  let myBank = new Bank()

  //Creating Customers 
  for(let i: number = 1; i <=3; i++){
    let name = faker.person.fullName()
    let mobileNo = parseInt(faker.phone.number())
    let customerID = faker.number
    let customerNew = new Customer(name, customerID, mobileNo, 500,1000 + i)
    myBank.addCustomer(customerNew)
    myBank.addAccountNo({accountNo: customerNew.accountNo, balalnce: 10000.99 * i })
  }

  //Banking Functionalities
console.log(myBank)

console.log("Welcome to", chalk.green.bold("My Bank Application!"))
  async function Main(bank: Bank){
    do{
      let service = await inquirer.prompt([
        {
          type: 'list',
          name: 'select',
          message: 'Please Select the Provided Service:',
          choices: ["Balance Inquiry", "Cash Withdrawl", "Cash Deposit", "Exit"]
        }
      ])
      switch (service.select){
        case "Balance Inquiry":
        const balanceInqury = await inquirer.prompt([
          {
            type: 'input',  
            name: 'accountNo',
            message: 'Enter Account Number to check Balance:'
          },
        ])
        let findAccount1 = myBank.account.find((acc) => acc.accountNo == balanceInqury.accountNo)

        if(!findAccount1){
          console.log(chalk.bold.red("Invalid account no."))
        }

      if(findAccount1){
        let name = myBank.customer.find(
          (item) => item.accountNo == findAccount1?.accountNo)
          console.log(`Dear ${chalk.green.bold(name?.name)}! Your Account Balance is ${chalk.bold.cyanBright("Rs.", findAccount1.balalnce)}`)
      }
      break;

    case "Cash Withdrawl":
      const withdrawl = await inquirer.prompt([
        {
          type: "number",
          name: "accountNo",
          message: "Enter Account Number for Withdrawl:"
        }
      ]);
      let findAccount2 = myBank.account.find((acc) => acc.accountNo == withdrawl.accountNo)
      if (!findAccount2){
        console.log(chalk.bold.red("Invalid account number")) 
    }

      if (findAccount2){
        let withdrawn = await inquirer.prompt([
          {
            type: "number",
            name: "withdraw",
            message: "Please Enter Amount to be Withdrawn:"
          }
        ]);

        if(withdrawn.withdraw > findAccount2.balalnce){
          console.log(chalk.red.bold("Insufficent Balance!"))
        }
        let newBlance = findAccount2.accountNo - withdrawn.withdraw
        bank.transaction({ accountNo: findAccount2.accountNo, balalnce: newBlance})
      }
      break;

  case "Cash Deposit":
    let deposit = await inquirer.prompt({
      type: "input",
      name: "accountNo",
      message: "Enter Account No for Deposit:"
    });
    let findAccount3 = myBank.account.find((acc) => acc.accountNo == deposit.accountNo)  

    if (!findAccount3){
      console.log(chalk.red.bold("Invalid Account No."))
    }
    if (findAccount3){
      let depositAction = await inquirer.prompt({
        type: "number",
        name: "depositAmount",
        message: "Enter Deposit Amount:"
      });

      let newBalance = findAccount3.balalnce + depositAction.depositAmount
      bank.transaction({ accountNo: findAccount3.accountNo, balalnce: newBalance})
  }
  break;

case "Exit":
  console.log(`Thank You for Using`, chalk.green.bold("My Bank Application"))
  process.exit(0)
}

} while(true)
}

Main(myBank)