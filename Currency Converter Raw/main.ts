import chalkAnimation from 'chalk-animation';
import inquirer from 'inquirer';

const exchangeRates: Record<string, number> = {
  USD: 1.0,    // Default currency (USD)
  EUR: 0.85,   // Example exchange rate for EUR (to USD)
  GBP: 0.72,   // Example exchange rate for GBP (to USD)
};

async function promptUser() {
  const currencyChoices = Object.keys(exchangeRates);
  currencyChoices.push('Quit');

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'amount',
      message: 'Enter the amount:',
      validate: (value: string) => {
        const amount = parseFloat(value);
        return !isNaN(amount) || 'Please enter a valid number.';
      },
    },
    {
      type: 'list',
      name: 'fromCurrency',
      message: 'Select the source currency:',
      choices: currencyChoices,
    },
    {
      type: 'list',
      name: 'toCurrency',
      message: 'Select the target currency:',
      choices: currencyChoices,
    },
  ]);

  const { amount, fromCurrency, toCurrency } = answers;

  if (fromCurrency === 'Quit' || toCurrency === 'Quit') {
    console.log('Quitting...');
    return;
  }

  const result = convertCurrency(parseFloat(amount), fromCurrency, toCurrency);

  if (result !== undefined) {
    console.log(`Converted amount: ${result.toFixed(2)} ${toCurrency}`);
  }
}

function convertCurrency(amount: number, fromCurrency: string, toCurrency: string): number | undefined {
  if (exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
    return (amount / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
  } else {
    console.log('Invalid currency codes.');
    return undefined;
  }
}

function main() {
  const rainbowAnimation = chalkAnimation.rainbow('Currency Converter');
  rainbowAnimation.start();

  promptUser().then(() => {
    rainbowAnimation.stop(); // Stop the animation before exiting
  });
}

main();
