# This is a DEMO for Learn Next.js

[Next.js](https://nextjs.org/learn).

## Zustand - State Management

Zustand is very light-weight State Management

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

