import React from 'react';
import { useToggle } from 'gthooks';
export default () => {
    const [state, { toggle, set, setLeft, setRight }] = useToggle();
    return (<div>
      <div>Effect: {`${state}`}</div>
      <button onClick={toggle}>toggle</button>
      <button onClick={() => set(true)}>set true</button>
      <button onClick={setLeft}>set left</button>
      <button onClick={setRight}>set right</button>
    </div>);
};
//# sourceMappingURL=demo.jsx.map