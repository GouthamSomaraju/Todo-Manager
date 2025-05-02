import React, { useState, useCallback } from "react";

const ChildComponent = React.memo(({ handleClick }) => {
  console.log("Child re-rendered!");
  return <button onClick={handleClick}>Click Me</button>;
});

const ParentComponent = () => {
  const [count, setCount] = useState(0);

  // Memoized function, only changes when `count` changes
  const handleClick = useCallback(() => {
    console.log("Button clicked!");
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      <ChildComponent handleClick={handleClick} />
    </div>
  );
};

export default ParentComponent;