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

