import { useEffect, useState } from 'react';


/**
 * use this Hook to
 * fix error "Text content does not match server-rendered HTML"
 * when zustand was persist.
 */

/**
 * 
 * @param {*} store 
 * @param {*} defaultState 
 * @returns {import('@store/auth-store').AuthStoreType}
 */
const usePersistStore = (store, defaultState = {}) => {
    const result = store;
    const [data, setData] = useState(defaultState);

    useEffect(() => {
        setData(result);
    }, [result]);

    return data;
}

export default usePersistStore;