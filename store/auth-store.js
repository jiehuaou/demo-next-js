import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
// import useSWR from 'swr';


export const initState = {
    user: 'Unknow',
    token: '',
    stamp: '',
    ready: false,
    loading: false,
}

const useAuthStore = create(persist((set) => ({
    ...initState,
    login: async function (params) {
        set({ready: false,loading: true});
        const json = await fetch('/api/slow-auth').then(res=>res.json());
        set({...json, ready: true, loading: false})
    },
    logout: async function (params) {
        
        set({...initState})
    }
})
,{
    name: 'auth-storage',
    storage: createJSONStorage(() => sessionStorage), 
}
));


export default useAuthStore;