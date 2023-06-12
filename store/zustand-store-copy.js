import { create } from 'zustand';
import {produce} from "immer"
import { immer } from "zustand/middleware/immer";
// import useSWR from 'swr';

const addMoney = function (balance, amount) {
    return balance + amount;
}


const useCounterStore = create((set) => ({
    inited: false,
    count: 0,
    total: 0,
    ready: false,
    money: {
        money1: {
            balance: 123,
            account: '888'
        },
        money2: {
            balance: 123,
            account: '999'
        }
    },
    increment: async () => {
        set(state => ({ ready: false }));
        set(state => ({ count: state.count + 1, total: state.total + 1 }));
        setTimeout(() => {
            set(state => ({ ready: true }));
        }, 1000);
    },
    decrement: () => set(state => ({ count: state.count - 1 })),
    init: async () => {
        const jsonData = await fetch('/api/init').then(res=>res.json());
        //const jsonData = await res.json();
        set({ ...jsonData, ready: true, inited: true });
    },
    addMoney: (account, amount) => {
        if (account === "888") {
            set(state => ({ money: { ...state.money, money1: { ...state.money.money1, balance: state.money.money1.balance + amount } } }))
        } else if (account==="999") {
            set(produce(temp => {temp.money.money2.balance = temp.money.money2.balance + amount }  ))
        }
    },
    drawMoney: (account, amount) => { 
        if (account === "888") {
            set(produce(temp => {temp.money.money1.balance = temp.money.money1.balance - amount }  ))
        } else if (account==="999") {
            set(produce(temp => {temp.money.money2.balance = temp.money.money2.balance - amount }  ))
        }
    }
}));

//useCounterStore.subscribe(console.log);

export default useCounterStore;