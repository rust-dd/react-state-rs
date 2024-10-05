import "./App.css";

import { createStore } from "react-state-rs";

const store = createStore({ count: 0 });

function App() {
  const count = store.getKey("count");

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => store.update("count", store.getKey("count") + 1)}>Increment</button>
      <button onClick={() => store.update("count", store.getKey("count") - 1)}>Decrement</button>
    </div>
  );
}

export default App;
