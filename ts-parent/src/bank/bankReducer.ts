import { act } from "react";

export interface BankState {
    balance: number;
    history: string[];
}

export type BankAction =
    | {type: "DEPOSIT"; amount: number}
    | {type: "WITHDRAW"; amount: number}
    | {type: "RESET"}

export const initialState: BankState = {
    balance: 0,
    history: [],
}

export function bankReducer(state: BankState, action: BankAction): BankState {
    switch (action.type) {
        case "DEPOSIT":
            return {
                balance: state.balance + action.amount,
                history: [...state.history, `입금 ${action.amount.toLocaleString()}원`],
            }
        case "WITHDRAW":
            if (action.amount > state.balance) {
                return state
            }
            return {
                balance: state.balance - action.amount,
                history: [...state.history, `출금 ${action.amount.toLocaleString()}원`],
            }
        case "RESET":
            return initialState
        default:
            return state
    }
}