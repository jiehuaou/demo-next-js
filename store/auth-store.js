import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
// import useSWR from 'swr';


export const initState = {
    user: 'Unknow',
    token: '',
    stamp: '',
    ready: false,
    loading: false,
    error: false,
}

const whenLoading = function () {
    return {
        ...initState,
        loading: true,
        ready: false,
        error: false,
    }
}

const whenSuccess = function (params) {
    return {
        ...params,
        loading: false,
        ready: true,
        error: false,
    }
}

const whenError = function () {
    return {
        ...initState,
        loading: false,
        ready: false,
        error: true,
    }
}

const useAuthStore = create(persist((set) => ({
    ...initState,
    login: async function (params) {
        console.log(" login user .......... ");
        set(whenLoading());
        const json = await fetch('/api/slow-auth').then(res=>res.json());
        set(whenSuccess(json));
        console.log(" login user .......... " + json?.user);
    },
    logout: async function (params) {
        set({...initState});
    },
    withLoading: function () {
        set(whenLoading());
    },
    withError: function () {
        set(whenError());
    }, 
    withSuccess: function (params) {
        set(whenSuccess(params));
    }
})
,{
    name: 'auth-storage',
    storage: createJSONStorage(() => sessionStorage), 
}
));


export default useAuthStore;