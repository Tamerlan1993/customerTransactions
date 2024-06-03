export interface ICustomer {
    CustomerID: string;
    Name: string;
    Surname: string;
    BirthDate: string;
    GSMNumber: string;
    CardNumber: string;
}

export interface ITransaction {
    TransactionID: string;
    CustomerID: string;
    TransactionDate: string;
    TransactionAmount: string;
}