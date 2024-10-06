import dayjs from "dayjs";
import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { create } from "react-state-rs";
import { create as zCreate } from "zustand";
import "./App.css";

const store = create<{ count: number }>({ count: 0 });
const zustandStore = zCreate<{ count: number }>(() => ({ count: 0 }));
const countAtom = atom(0);

function App() {
  const count = store((state) => state.count);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => store.setState({ count: count + 1 })}>Increment</button>
      <button onClick={() => store.setState({ count: count - 1 })}>Decrement</button>

      <Rust />
    </div>
  );
}

function Rust() {
  const count = store((state) => state.count);
  const [rustFinished, setRustFinished] = useState(false);

  useEffect(() => {
    const start = dayjs();

    for (let i = 0; i < 1000000; i++) {
      store.setState({ count: count + 1 });
    }

    console.log("Rust", dayjs().diff(start, "millisecond"));
    setRustFinished(true); // Rust művelet befejezése után állítjuk be
  }, []);

  return (
    <div>
      <h1>{count}</h1>
      {rustFinished && <Zustand />} {/* Zustand csak akkor indul, ha a Rust kész */}
    </div>
  );
}

function Zustand() {
  const zustandCount = zustandStore((state) => state.count);
  const [zustandFinished, setZustandFinished] = useState(false);

  useEffect(() => {
    const start = dayjs();

    for (let i = 0; i < 1000000; i++) {
      zustandStore.setState({ count: zustandCount + 1 });
    }

    console.log("Zustand", dayjs().diff(start, "millisecond"));
    setZustandFinished(true); // Zustand művelet befejezése után állítjuk be
  }, []);

  return (
    <div>
      <h1>{zustandCount}</h1>
      {zustandFinished && <Jotai />} {/* Jotai csak akkor indul, ha a Zustand kész */}
    </div>
  );
}

function Jotai() {
  const [count, setCount] = useAtom(countAtom);

  useEffect(() => {
    const start = dayjs();

    for (let i = 0; i < 1000000; i++) {
      setCount((c) => c + 1);
    }

    console.log("Jotai", dayjs().diff(start, "millisecond"));
  }, []);

  return (
    <div>
      <h1>{count}</h1>
    </div>
  );
}

export default App;
