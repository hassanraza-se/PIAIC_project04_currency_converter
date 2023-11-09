#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const success = (...message) => { console.log(chalk.green(message)); };
const info = (...message) => { console.log(chalk.blue(message)); };
const error = (...message) => { console.log(chalk.red(message)); };
var CURRENCY;
(function (CURRENCY) {
    CURRENCY["PKR"] = "PKR";
    CURRENCY["USD"] = "USD";
    CURRENCY["EUR"] = "EUR";
    CURRENCY["GBP"] = "GBP";
})(CURRENCY || (CURRENCY = {}));
const exchangeRates = {
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
            validate(input) {
                const parsedValue = parseFloat(input);
                return !isNaN(parsedValue) && parsedValue > 0;
            },
            transformer(input) {
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
    ]).then(({ currency, amount, targetCurrency }) => {
        let convertedAmount;
        convertedAmount = amount * (exchangeRates[currency] / exchangeRates[targetCurrency]);
        convertedAmount = convertedAmount.toFixed(2);
        success(`${amount}${currency} equals to: ${convertedAmount}${targetCurrency}`);
        inquirer.prompt({
            name: "action",
            type: "confirm",
            message: "Want to try again?:",
        }).then(({ action }) => {
            if (action) {
                convertCurrency();
            }
            else {
                info("Thank you for using the app.");
            }
        });
    });
}
convertCurrency();
