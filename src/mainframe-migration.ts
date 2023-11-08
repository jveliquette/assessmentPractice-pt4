import fs, { access, accessSync, writeFileSync } from 'fs'

// Type alias Transaction
type Transaction = {
    date: string
    transactionId: string
    product: Product
    userId: string
    quantity: number
    price: number
}

// Type alias Product
type Product = {
    id: string
    name: string
    description: string
}

export function parseData(data: string) {
    // Check if the input file exists, if not, error and exit
    if (!fs.existsSync('./input.txt')) {
        console.log('Input file does not exist.');
        process.exit(1);
    }

    // Check if file can be read, if not, error and exit
    try {
        fs.accessSync('./input.txt', fs.constants.R_OK);
    } catch (err) {
        console.log('Cannot read input file.')
        process.exit(1)
    }

    // Check if file can be written to, if not, error and exit
    try {
        fs.accessSync('./output.json', fs.constants.W_OK);
    } catch (err) {
        console.log('Cannot write to output file.');
        process.exit(1);
    }

    // define your transactions here
    // declaring a variable named lines, setting equal to data that is split at new line, returns array
    const lines = data.split('\n');

    // declaring a variable named transactions, with type any[], setting equal to empty array
    let transactions: any[] = [];

    // looping through lines array using for of loop and splitting at each '|'
    for (const line of lines) {
        const [date, transactionId, productId, productName, productDescription, userId, quantity, price] = line.split('|');

        // looping through array starting at index 1 to assign values to keys
        for (let i = 1; i < lines.length; i++) {
            // declaring a variable named values, setting equal to index[i] of lines array and splitting at '|'
            const values = lines[i].split('|');

            // Checks for malformed input, error message, skip
            // if values does not strictly equal 8 OR values includes an empty string, error
            if (values.length !== 8 || values.includes('')) {
                console.log(`Error: Malformed input ${lines[i]}`);
                continue;
            }

        // declaring a variable named transaction and setting it equal to keys and given values[i]
        const transaction = {
            date: values[0],
            transactionId: values[1],
            product: {
                id: values[2],
                name: values[3],
                description: values[4],
            },
            userId: values[5],
            quantity: parseInt(values[6]), // parses string, converts to number
            price: parseFloat(values[7]) // parses string, converts to floating point number
        };
        // pushing values of transaction to the empty transactions array we declared earlier
        transactions.push(transaction);
    }
    // returning transactions array
    return transactions;
    }
}

export function main() {
    const data = fs.readFileSync('./input.txt', 'utf8')
    const transactions = parseData(data)
    const output = JSON.stringify({ transactions }, null, 2)
    fs.writeFileSync('./output.json', output, 'utf8')
    console.log('Successfully wrote output file.')
}
