# Programming Challenge: Mainframe Data Migration

**Goal**: Produce a functioning TypeScript program that meets all the
requirements.

## Background

You have been hired as a software developer at Globex Corporation, a
multinational conglomerate that has been in operation for several decades.
Recently, Globex decided to modernize its old mainframe system, migrating to a
more flexible, cloud-based system. Your first task is to create a script to
convert transaction data stored in an old column delimited file to JSON format.
This is an essential step in the transition process as it will aid in data
consolidation and enhance the company's business intelligence capabilities.

## Challenge

Write a command line script in a programming language of your choice that parses
a column delimited file of transaction records and produces a JSON summary of
those transactions. The script should allow the user to specify the input file
and the output file as command line arguments.

The input file has the following column-delimited format:

```csv
Date|TransactionID|ProductID|ProductName|ProductDescription|UserID|Quantity|Price
2023-05-31|12345|A101|Product1|Product 1 Description|U001|2|100.00
2023-05-30|12346|B202|Product2|Product 2 Description|U002|1|200.00
...
```

Each row in the file represents a transaction, where:

-   `Date` is the date the transaction was completed in the format `YYYY-MM-DD`
-   `TransactionID` is a unique identifier for each transaction
-   `ProductID` is the identifier for the product
-   `ProductName` is the name of the product
-   `ProductDescription` is a longer description of the product
-   `UserID` is the identifier for the user that completed the transaction
-   `Quantity` is the number of units of the product sold in the transaction
-   `Price` is the price of one unit of the product

The output file should be in the following JSON format:

> Note that the three fields `ProductId`, `ProductName` and `ProductDescription`
> are broken down into a nested "product" with "id", "name", and "description"

```json
{
    "transactions": [
        {
            "date": "2023-05-31",
            "transactionId": "12345",
            "product": {
                "id": "A101",
                "name": "",
                "description": "",
            },
            "userId": "U001",
            "quantity": 2,
            "price": 100.00
        },
        {
            "date": "2023-05-30",
            "transactionId": "12346",
            "product": {
                "id": "B202",
                "name": "",
                "description": ""
            },
            "productId": "B202",
            "userId": "U002",
            "quantity": 1,
            "price": 200.00
        },
        ...
    ],
}
```

## Requirements

-   The script should check if the input file exists and can be read. If not, it
    should print an appropriate error message and exit.
-   The script should also check if the output file can be written to. If not,
    it should print an appropriate error message and exit.
-   The script should handle malformed input gracefully: if a row in the input
    file is malformed, it should print an appropriate error message, skip that
    row, and continue with the next one.
-   Make sure your code is properly commented and explained.


The script is in the __src__ folder. 
There is a **mainframe-migration.test.ts** file with tests for this script.

You should first run `npm install` to install Node packages and their dependencies.


## Bonus

Implement a feature where the user can filter transactions based on date or a
particular user.

Good luck!
