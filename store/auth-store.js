// @ts-check
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
// import useSWR from 'swr';

/**
 * @typedef {object} AuthState
 * @property {string} user
 * @property {string} token
 * @property {string} stamp
 * @property {boolean} ready
 * @property {boolean} loading
 * @property {boolean} error
 */

/**
 * @typedef {object} AuthData
 * @property {string} user
 * @property {string} token
 * @property {string} stamp
 */

/**
 * @type {AuthState}
 */
const initState = {
    user: 'Unknow',
    token: '',
    stamp: '',
    ready: false,
    loading: false,
    error: false,
}

/**
 * 
 * @returns {AuthState}
 */
function whenLoading() {
    return {
        ...initState,
        loading: true,
        ready: false,
        error: false,
    }
}

/**
 * 
 * @param {AuthData} params 
 * @returns {AuthState}
 */
const whenSuccess = function (params) {
    return {
        ...params,
        loading: false,
        ready: true,
        error: false,
    }
}

/**
 * 
 * @returns {AuthState}
 */
const whenError = function () {
    return {
        ...initState,
        loading: false,
        ready: false,
        error: true,
    }
}


/**
 * @typedef { ()=>Promise<void>} asyncAction
 * @typedef { (param:AuthData)=>Promise<void>} asyncParamAction
 * 
 * @typedef { {login: asyncAction, logout: asyncAction, 
 *              withLoading: asyncAction, withError: asyncAction,
 *              withSuccess: asyncParamAction} } AuthAction
 * 
 */

/**
 * @typedef { AuthState & AuthAction } AuthStoreType
 * 
 * @returns {AuthStoreType}
 */
const useAuthStore = create(persist((set) => ({
    ...initState,
    login: async function () {
        console.log(" login user .......... ");
        set(whenLoading());
        const json = await fetch('/api/slow-auth').then(res => res.json());
        set(whenSuccess(json));
        console.log(" login user .......... " + json?.user);
    },
    logout: async function () {
        set({ ...initState });
    },
    withLoading: function () {
        set(whenLoading());
    },
    withError: function () {
        set(whenError());
    },

    /**
     * @param {AuthData} params 
     */
    withSuccess: function (params) {
        set(whenSuccess(params));
    }
})
    , {
        name: 'auth-storage',
        storage: createJSONStorage(() => sessionStorage),  //sessionStorage // localStorage
        partialize: (state) => ({
            user: state.user,
            token: state.token,
            stamp: state.stamp,
            ready: state.ready,
            loading: false,     // [Middle State] should not be sync to local storage
            error: state.error,
        }),
    }
));

export { initState };

export default useAuthStore;