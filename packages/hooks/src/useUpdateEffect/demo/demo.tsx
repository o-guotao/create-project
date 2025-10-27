import React, {useEffect, useState} from "react";
import useUpdateEffect from "../index";

export default () => {

    const [count, setCount] = useState(0);
    const [effectCount, setEffectCount] = useState(0);
    const [updateEffectCount, setUpdateEffectCount] = useState(0);

    useEffect(() => {
        setEffectCount((c) => c + 1)
    },[count])
    useUpdateEffect(() => {
        setUpdateEffectCount((c) => c + 1)
    },[count])
   return (
    <div>
      <div>
        <button onClick={() => setCount( c => c + 1)}>count + 1</button>
      </div>
      <div>
        <div>count: {count}</div>
        <div>effectCount: {effectCount}</div>
        <div>updateEffectCount: {updateEffectCount}</div>
      </div>
    </div>
  );
}