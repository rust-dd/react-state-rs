# `react-state-rs`

**Proof of concept React state manager in WebAssembly using Rust.**

`react-state-rs` is a minimal state management solution for React applications, built with Rust and compiled to WebAssembly (WASM). It aims to leverage the performance and memory safety features of Rust to manage application state in React effectively.

## Usage

### Setting Up the State

```javascript
import { create } from 'react-state-rs';

// Initialize the state
const store = create({ count: 0 });

function App() {
  const count = store((state) => state.count);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => store.setState({ count: count + 1 })}>
        Increment
      </button>
      <button onClick={() => store.setState({ count: count - 1 })}>
        Decrement
      </button>
    </div>
  );
}

export default App;
```

--- 

This is a simple proof of concept demonstrating how to manage state in React using Rust compiled to WebAssembly.