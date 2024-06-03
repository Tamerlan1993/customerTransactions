export const ROUTES = {
    CUSTOMERS: {
        path: "/",
        label: 'Customers'
    },
    TRANSACTIONS: {
        path: "/transactions",
        label: 'Transactions'
    },
}

export const dateFormat = "DD/MM/YYYY"

export const DEFAULT_COUNT_OPTIONS = [10, 20, 50];

export const requiredMessage = 'Field is required';

export const customerKeys = {
    CustomerID: {
        key: 'CustomerID',
        label: 'Customer Id',
    },
    Name: {
        key: 'Name',
        label: 'Name',
    },
    Surname: {
        key: 'Surname',
        label: 'Surname',
    },
    CardNumber: {
        key: 'CardNumber',
        label: 'Card Number',
    },
    GSMNumber: {
        key: 'GSMNumber',
        label: 'GSM Number',
    }, BirthDate: {
        key: 'BirthDate',
        label: 'Birth Date',
    }
}

export const transactionKeys = {
    CustomerID: {
        key: 'CustomerID',
        label: 'Customer Id',
    },
    TransactionAmount: {
        key: 'TransactionAmount',
        label: 'Transaction Amount',
    },
    TransactionDate: {
        key: 'TransactionDate',
        label: 'Transaction Date',
    },
    TransactionID: {
        key: 'TransactionID',
        label: 'Transaction ID',
    }
}