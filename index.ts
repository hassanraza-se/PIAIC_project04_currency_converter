#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
const success = (...message: any[]) => { console.log(chalk.green(message)) };
const info = (...message: any[]) => { console.log(chalk.blue(message)) };
const error = (...message: any[]) => { console.log(chalk.red(message)) };

enum CURRENCY {
    PKR = "PKR",
    USD = "USD",
    EUR = "EUR",
    GBP = "GBP"
}

const exchangeRates: Record<CURRENCY, number> = {
    PKR: 1,
    USD: 289,
    GBP: 358,
    EUR: 310
};

function convertCurrency() {
    inquirer.prompt([
        {
            name: "currency",
            type: "list",
            message: "Select Your Currency:",
            choices: Object.values(CURRENCY)
        },
        {
            name: "amount",
            type: "input",
            message: "Enter the amount:",
            validate(input: any): boolean | string | Promise<boolean | string> {
                const parsedValue = parseFloat(input);
                return !isNaN(parsedValue) && parsedValue > 0;
            },
            transformer(input: any, ): number | Promise<any> {
                return parseFloat(input);
            },
            default: 1
        },
        {
            name: "targetCurrency",
            type: "list",
            message: "Select the target currency:",
            choices: Object.values(CURRENCY)
        }
    ]).then(({currency, amount, targetCurrency}) => {
        let convertedAmount: number|string;
        convertedAmount = amount * (exchangeRates[currency as CURRENCY] / exchangeRates[targetCurrency as CURRENCY]);

        convertedAmount = convertedAmount.toFixed(2);

        success(`${amount}${currency} equals to: ${convertedAmount}${targetCurrency}`);
        inquirer.prompt({
            name: "action",
            type: "confirm",
            message: "Want to try again?:",
        }).then(({action}) => {
            if (action) {
                convertCurrency();
            } else {
                info("Thank you for using the app.");
            }
        })
    });
}

convertCurrency();