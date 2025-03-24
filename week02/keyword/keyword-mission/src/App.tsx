import React, { useState } from "react";

function App() {
  const [count, setCount] = useState<number>(() => 0);
  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };
  const handleDecrement = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>{count}</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={handleIncrement}>+1</button>
        <button onClick={handleDecrement}>-1</button>
      </div>
    </div>
  );
}

export default App;
