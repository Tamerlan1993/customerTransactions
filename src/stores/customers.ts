import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ICustomer } from "../constants/models";
import customersData from '../data/customers.json';

const initialState = {
    customers: customersData.toReversed()
}
export type State = typeof initialState;

export const useCustomers = create<State>()(persist(() => {
    return {
        ...initialState,
    }
}, { name: 'customers' }))

export const setCustomers = (data: ICustomer[]) => useCustomers.setState({
    customers: data
})
