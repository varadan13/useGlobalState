# useGlobalState

A simple React hook for managing global state with zero boilerplate.

## What is useGlobalState?

A lightweight React hook that provides global state management without providers, context, or complex setup.

- 🧠 **Simple API** - Just like `useState` but globally shared
- �� **No Providers** - No Context. No extra setup required
- ⚡ **Global by default** - All state is automatically shared across components
- 🧩 Works with any state shape: primitives, arrays, objects
- 🧼 Built with React's `useSyncExternalStore` for optimal performance

## 🚀 Quick Start

### 🔸 Basic Usage

```tsx
const [count, setCount] = useGlobalState("counter", 0);
```

### 🔸 With Objects

```tsx
const [user, setUser] = useGlobalState("user", { name: "John", age: 25 });
```

### 🔸 Sharing Between Components

```tsx
// ComponentA.tsx
export function ComponentA() {
  const [count, setCount] = useGlobalState("shared-count", 0);

  return (
    <div>
      <h3>Component A</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// ComponentB.tsx
export function ComponentB() {
  const [count] = useGlobalState("shared-count", 0); // same key

  return (
    <div>
      <h3>Component B</h3>
      <p>Count from A: {count}</p>
    </div>
  );
}
```

## 🧩 API

```ts
const [state, setState] = useGlobalState(key, initialValue);
```

- **`key`**: Unique string identifier for the state entry
- **`initialValue`**: Initial value (only used if the key doesn't exist yet)
- **Returns**: `[state, setState]` tuple just like `useState`

## 🛠️ Usage Examples

### 🔢 Counter Example

```tsx
const [count, setCount] = useGlobalState("counter", 0);

// Direct assignment
setCount(5);

// Increment
setCount(count + 1);
```

### 🧍 User Object Example

```tsx
const [user, setUser] = useGlobalState("user", { 
  name: "Alex", 
  age: 25 
});

// Update entire object
setUser({ name: "John", age: 30 });

// Note: This replaces the entire object, not merge
```

### 📝 Todo List Example

```tsx
const [todos, setTodos] = useGlobalState("todos", []);

// Add todo
setTodos([...todos, { id: 1, text: "Learn React", done: false }]);

// Toggle todo
setTodos(todos.map(todo => 
  todo.id === 1 ? { ...todo, done: !todo.done } : todo
));
```

## ⚠️ Important Notes

### State Sharing
- Components using the same `key` will share the same state
- The `initialValue` is only used when the key doesn't exist yet
- Subsequent calls with the same key will get the existing value

### Object Updates
- Unlike some state management libraries, this hook does **direct assignment**
- When updating objects, you need to manually merge properties:

```tsx
// ❌ This will replace the entire object
setUser({ name: "John" }); // loses age property

// ✅ This preserves other properties
setUser({ ...user, name: "John" });
```

## 🔍 How It Works

1. **Global Store**: Uses a Map to store all state entries
2. **Subscription System**: Components subscribe to state changes via listeners
3. **Automatic Re-renders**: When state changes, all subscribed components re-render
4. **No Providers**: Uses React's `useSyncExternalStore` for external state management

## �� License

MIT

## Reference

https://www.npmjs.com/package/use-s-react
