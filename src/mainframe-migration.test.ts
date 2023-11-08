import { parseData } from './mainframe-migration.js'
import { describe, expect, it, afterEach, vi } from 'vitest'

describe('parseData', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })
    it('should correctly parse valid data string into a transaction array', () => {
        const data = `date|transactionId|productId|productName|productDescription|userId|quantity|price\n2023-01-01|trans1|prod1|product1|product 1|user1|5|100.00\n2023-01-02|trans2|prod2|product2|product 2|user2|10|200.00`
        const transactions = parseData(data)
        expect(transactions).toEqual([
            {
                date: '2023-01-01',
                transactionId: 'trans1',
                product: {
                    id: 'prod1',
                    name: 'product1',
                    description: 'product 1',
                },
                userId: 'user1',
                quantity: 5,
                price: 100.0,
            },
            {
                date: '2023-01-02',
                transactionId: 'trans2',
                product: {
                    id: 'prod2',
                    name: 'product2',
                    description: 'product 2',
                },
                userId: 'user2',
                quantity: 10,
                price: 200.0,
            },
        ])
    })

    it('should ignore empty lines and lines with missing fields', () => {
        const data = `date|transactionId|productId|productName|productDescription|userId|quantity|price\n|trans1|prod1|product1|product 1|user1|5|100.00\n2023-01-02|trans2|prod2|product2|product 2|user2|10|200.00\n\n2023-01-03||prod3|product3|product 3|user3|15|300.00`
        const transactions = parseData(data)
        expect(transactions).toEqual([
            {
                date: '2023-01-02',
                transactionId: 'trans2',
                product: {
                    id: 'prod2',
                    name: 'product2',
                    description: 'product 2',
                },
                userId: 'user2',
                quantity: 10,
                price: 200.0,
            },
        ])
    })
})
