import { create } from 'zustand';
// import {produce} from "immer"
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
// import useSWR from 'swr';

// const addMoney = function (balance, amount) {
//     return balance + amount;
// }

let timerHandler = null;

const useCounterStore = create(immer((set) => ({
    inited: false,
    count: 0,
    total: 0,
    ready: true,
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
        if(timerHandler !== null) {
            clearTimeout(timerHandler);
            //  timerHandler = null;
        }
        set(state => { state.ready = false });
        set(state => { ++state.count; ++state.total;});
        timerHandler = setTimeout(() => {
            set(state => { state.ready = true });
        }, 1000);
    },
    decrement: () => set(state => { --state.count; }),
    init: async () => {
        const jsonData = await fetch('/api/init').then(res=>res.json());
        set({ ...jsonData, ready: true, inited: true });
    },
    /**
     * allow deep nested state update with help of Immer
     */
    addMoney: (account, amount) => {
        if (account === "888") {
            set(temp => { temp.money.money1.balance = temp.money.money1.balance + amount })
        } else if (account==="999") {
            set(temp => {temp.money.money2.balance = temp.money.money2.balance + amount })
        }
    },
    drawMoney: (account, amount) => { 
        if (account === "888") {
            set(temp => {temp.money.money1.balance = temp.money.money1.balance - amount })
        } else if (account==="999") {
            set(temp => {temp.money.money2.balance = temp.money.money2.balance - amount })
        }
    }
})
));

//useCounterStore.subscribe(console.log);

export default useCounterStore;