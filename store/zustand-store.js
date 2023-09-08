import { create } from 'zustand';
// import {produce} from "immer"
import { immer } from "zustand/middleware/immer";
// import useSWR from 'swr';



/**
 * @type {NodeJS.Timeout|null}
 */
let timerHandler = null;

/**
 * @typedef {{inited: boolean, count: number, total: number, ready: boolean,
 *      money: { 
 *          money1: {balance: number,account: string },
 *          money2: {balance: number,account: string }}
 * }} CounterType
 * 
 * @typedef {(state:CounterType) => void} CounterAction
 * 
 * @typedef {(action:CounterAction)=> void} EnqueueAction
 */


/**
 * use inline jsdoc to describe Zustand "set".
 */
const useCounterStore = create(immer((/**@type {EnqueueAction} */set) => ({
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
        if (timerHandler !== null) {
            clearTimeout(timerHandler);
            //  timerHandler = null;
        }
        set(state => { state.ready = false });
        set(state => { ++state.count; ++state.total; });
        timerHandler = setTimeout(() => {
            set(state => { state.ready = true });
        }, 1000);
    },
    decrement: () => set(state => { --state.count; }),
    init: async () => {
        const jsonData = await fetch('/api/init').then(res => res.json());
        set({ ...jsonData, ready: true, inited: true });
    },
    /**
     * allow deep nested state update with help of Immer
     * 
     * @param {string} account 
     * @param {number} amount 
     */
    addMoney: (account, amount) => {
        if (account === "888") {
            set(temp => { temp.money.money1.balance = temp.money.money1.balance + amount })
        } else if (account === "999") {
            set(temp => { temp.money.money2.balance = temp.money.money2.balance + amount })
        }
    },
    /**
     * draw out Money
     * @param {string} account 
     * @param {number} amount 
     */
    drawMoney: (account, amount) => {
        if (account === "888") {
            set(temp => { temp.money.money1.balance = temp.money.money1.balance - amount })
        } else if (account === "999") {
            set(temp => { temp.money.money2.balance = temp.money.money2.balance - amount })
        }
    }
})
));

//useCounterStore.subscribe(console.log);

export default useCounterStore;