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

## use memo and useCallback

### what is memo ?

**memo** is used to wrap component to skip re-rendering when its props are the same as on last render, whenever parent re-render.

```js
const PostButton = memo(({ helloAction }) => {

    useEffect(() => {
        // will show log at every loop if not using useCallback, even if data is not changed.
        console.log('2) hello...  helloAction=>' + helloAction);
    }, [helloAction]);

    // will show log at every loop if not using "memo"
    console.log('1) hello...  helloAction=>' + helloAction);

    // without useCallback & memo, this Button will re-render at every loop 
    return (
        <Button onPress={helloAction} size='sm'>hello</Button>
    )
});
```

### what is useCallback?

**useCallback** is used to cache function when Dependency not changed
since ()=>{} will always be different object, 
and trigger ref component re-render.

```js
function Comp(){
    
    // Now sayHello is unchanged as long as Dependency not changed.
    const sayHello = useCallback(() => {
        setOutput('hello ' + data);
    }, [data, setOutput]);

    return  (<div>
                ...
                <ResetButton resetAction={resetHello} />
                ...
            </div>)
}
```    

## unit testing with env variable

**".env-cmdrc"** File: define env variable
```json
{
    "dev": {
        "SECRET_TEXT": "123456",
        "ENV3": "envtest3"
    },
    "production": {
        "ENV1": "production"
    }
}
```

test cmd with **dev variable**, in package.json
```json
{
  "test": "env-cmd -e dev mocha --require @babel/register tests/*.js ",
}
```

## TypeScript: declare named module
```ts
// file: foo-module.d.ts
declare module "foo-lib" {
    export interface FooRequest {
        id: number;
        name: string;
    }
}
```

## TypeScript: extending named module

adding new property to existing interface

```ts
// file: foo-module2.d.ts
declare module "foo-lib" {
    export interface FooRequest {
        extra?: string;
    }
}
```

## JavaScript: reference named module Type from javascript

Jsdoc import types from module via module-name.

```js
// file: consumer.js
/**
 * @typedef {import("foo-lib").FooRequest} FooRequest
 */


/**
 * @param{FooRequest} request
 * @return{void}
 */
function query(request) {
  console.log(request);
}

/**
 * @type{FooRequest}
 */ 
const data = {id:123, name:'abc', extra:'hello'}

query(data); // call function
```

## TypeScript: declare module without name

Actually the file name becomes the module name.

```ts
// file: other1.ts
interface MyIdentity {
  id: number;
  name: string;
}
export {type MyIdentity};
```

## TypeScript: extending module without name
```ts
// file: other2.ts
declare module './other' {
    interface MyIdentity {
        token: string;
    }
 }
export {}
```
## JavaScript: reference non-module Type from javascript
```js
/**
 * @typedef {import("../types/other1").MyIdentity} MyIdentity
 */

/**
 * @type {MyIdentity}
 */
let params = {
      name: 'test@example.com',
      id: 30,
      token: '66666666666'
  };
```

## TypeScript：make local types globally accessible
```ts
// file: global.d.ts
import { type MyIdentity } from "./other1";
declare global {
  type MyIdentity2 = MyIdentity; 
}

export {};
```
Now **MyIdentity2** is globally accessible without explicitly import.

## TypeScript: declare namespace
```ts
// file: shape-namespace.d.ts
declare namespace myshape {
  interface Point {
    x: number;
    y: number;
  }
}
export = myshape;
```

## TypeScript: extending namespace
```ts
// file: shape-namespace2.d.ts
import { Point } from "./shape-namespace";

declare namespace myshape {
  interface Rectangle {
    start: Point;
    end: Point;
  }
}
export = myshape;
```

## TypeScript: jsdoc import namespace types
```js
// file: consume.js
/**
 * @typedef {import('../types/shape-namespace').Point} Point
 * @typedef {import('../types/shape-namespace2').Rectangle} Rectangle
 */
```
importing need to specify different file respectively !

## TypeScript: module vs namespace

TypeScript does **not recommend** to use namespace any more.

Actually module is simpler to import than namespace.

```js
/**
 * import module is relative simple
 * 
 * @typedef {import("foo-lib").FooRequest} FooRequest
 */

/**
 * import namespace is verbose, which looks not good.
 * 
 * @typedef {import('../types/shape-namespace').Point} Point
 * @typedef {import('../types/shape-namespace2').Rectangle} Rectangle
 */

```