import { ITransaction } from '@/constants/models';
import transactionsData from '@/data/transactions.json';
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
    transactions: transactionsData
}
export type State = typeof initialState;

export const useTransactions = create<State>()(persist(() => {
    return {
        ...initialState,
    }
}, { name: 'transactions' }))

export const setCustomers = (data: ITransaction[]) => useTransactions.setState({
    transactions: data
})
