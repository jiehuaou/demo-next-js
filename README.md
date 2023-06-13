# This is a DEMO for Learn Next.js

## Context Dependency Issue

Context providers only have access to the contexts that are wrapped by. This is illustrated in below diagram which should look very familiar to many:

```js
export const App = () => {
  return (
    <LayoutProvider>
      <GraphQLProvider>
        <AuthProvider>
          <UserProvider>
              <GlobalSearchProvider>
                <NeedsAccessToAllProvidersAbove>
                  <YetAnotherProvider>
                    <Layout />
                  </YetAnotherProvider>
                </NeedsAccessToAllProvidersAbove>
              </GlobalSearchProvider>
          </UserProvider>
        </AuthProvider>
      </GraphQLProvider>
    </LayoutProvider>
  );
};
```

## Context Consumer Re-rendering Issue

Using context for global state management could be issue since: 
* all consumers of a given context will re-render whenever its context value changes.

This is often not desirable since 
* components may only be concerned with a small portion of the state 
* and not need to render when there has been no change.


## Zustand - State Management

Zustand is very light-weight State Management and low boilerplate code.

1) define the store with property and function
```js
import { create } from 'zustand';

const useCounterStore = create((set) => ({
    count: 0,
    increment: () => set(state => ({ count: state.count + 1 })),
    decrement: () => set(state => ({ count: state.count - 1 }))
}));
export default useCounterStore;
```

2) use it in UI
```js
import useCounterStore from '../../store/zustand-store';

export default function ZustandDemo() {
    const {count, increment, decrement} = useCounterStore();
    return (
        <div>
            <p>Your score is {count}</p>
            <button onClick={increment}>Increment +</button>
            <button onClick={decrement}>Decrement -</button>
          </div>)
}
```

## Clsx - What is and how to use it

clsx is generally used to conditionally apply a given className.

```js
import utilStyles from '../styles/utils.module.scss';
import { clsx } from 'clsx';

const menuStyle = clsx({
    [utilStyles.root] : true,        //always applies
    [utilStyles.menuOpen] : open     //only when open === true
})
```

You can use it like this if apply multiple className.
```js
import { foo, bar, baz } from '../styles/utils.module.scss';

const style3 = clsx(foo, bar, baz)

return <div className={style3} />
```


## how to use SWR fetch data

### define your Hook
```js
import useSWR from "swr";

const useInvoiceSWR = () => {
  const id = useAuthStore((state) => state.user);
  const key = id && id !== 'Unknow' ? `/api/slow-invoice?id=${id}` : null;
  const { data, error, isLoading  } = useSWR(key, async (url) => {
      const r = await axios.get(url);
      return r.data;
    }
  );
  return {
    key: key,
    invoiceData: data,
    loading: isLoading,
    error: !!error
  };
};
export default useInvoiceSWR;
```
with useSWR,  you can access [ **data, error, isLoading** ] features.

### call your Hook inside React Component, 

```js
import { mutate, useSWRConfig } from "swr";
import useInvoiceSWR from '../../hook/use-your-swr';

const InvoiceListSWR = function ({cache}) {

    const {key, invoiceData, loading, error } = useInvoiceSWR();

    if (loading) {
        return <span><Loading /></span>
    } else if (error) {
        return <span>Something Wrong</span>
    } else {
        return (<>
            <InvoiceListComponent fetchType='SWR' invoiceData={invoiceData} />
            <button onClick={() => {
                // delete Key Data at cache but not trigger UI render
                cache.delete(key);
            }} >Delete SWR Cache -</button> <Space2x />
            <button onClick={() => {
                // refetch the data of specified Key, will trigger UI render if Key Data is deleted.
                mutate(key);
            }} >Re-fetch SWR Cache -</button> <Space2x />
        </>)
    }
}

export default function SWRDemo() {

    const { cache } = useSWRConfig();

    return <div>  
              <h1>hello world</h1>
              <InvoiceListSWR cache={cache} /> 
            </div>
}
```
* you can use [ data ] to build your UI list,
* use [ isLoading, error ] to show loading or error message
* use cache.delete(key) to delete the cache entry via [ key ],
* use mutate(key) to re-fetch data silently,

notice

* **cache.delete(key)** will delete Data at cache but not trigger UI render,
* **mutate(key)** will re-fetch the data of Key silently, may trigger UI render if Key's Data is deleted.

### SWR, isLoading vs isValidating 

**isLoading** is true only when data is fetched first time,

**isValidating** is true when data is either fetched first time, or re-fetch later on.

### SWR, Preloading Data

If you know the resource is going to be used later , use the **preload** API to start fetching it early:

```js
import useSWR, { preload } from 'swr';

preload('/api/user', fetcher);
```

### SWR, delete some key

use cache.keys() to find your keys
```js
import { mutate, useSWRConfig } from "swr";

const { cache } = useSWRConfig();

[...cache.keys()]
    .filter(e=>e.startsWith('/api/some-service'))
    .forEach(key => {
        cache.delete(key);
});

```

## Immer, What is and How to use ?

Immer, a Tool for Simplify Deep State Updates.

```js
import {produce} from "immer";

const initState = {
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
    }
}

/// save money to deep child 【money2】
produce(temp => {temp.money.money2.balance = temp.money.money2.balance + amount }  );

```
another solution without **produce**
 ```js
import { immer } from "zustand/middleware/immer";

const useCounterStore = create(immer((set) => ({
   ...
})));
 ```
