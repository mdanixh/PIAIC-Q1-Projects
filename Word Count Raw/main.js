import inquirer from 'inquirer';
async function countWordsAndCharacters() {
    const userInput = await inquirer.prompt([
        {
            type: 'input',
            name: 'paragraph',
            message: 'Enter an English paragraph:',
        },
    ]);
    const { paragraph } = userInput;
    // Remove extra whitespaces and split the paragraph into words
    const words = paragraph.trim().split(/\s+/);
    // Calculate the total number of characters and words
    const totalCharacters = paragraph.replace(/\s/g, '').length;
    const totalWords = words.length;
    // Count the frequency of each character
    const charCountMap = {};
    for (const char of paragraph.replace(/\s/g, '')) {
        if (charCountMap[char]) {
            charCountMap[char]++;
        }
        else {
            charCountMap[char] = 1;
        }
    }
    // Find the most frequently used character
    let mostUsedChar = '';
    let mostUsedCharCount = 0;
    for (const char in charCountMap) {
        if (charCountMap[char] > mostUsedCharCount) {
            mostUsedChar = char;
            mostUsedCharCount = charCountMap[char];
        }
    }
    console.log(`Total Characters (excluding whitespaces): ${totalCharacters}`);
    console.log(`Total Words: ${totalWords}`);
    console.log(`Most Used Character: "${mostUsedChar}" (Used ${mostUsedCharCount} times)`);
}
function main() {
    console.log('Welcome to the Word and Character Counter!\n');
    countWordsAndCharacters();
}
main();
