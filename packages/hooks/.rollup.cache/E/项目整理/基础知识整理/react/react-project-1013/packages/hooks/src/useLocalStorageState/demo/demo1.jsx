/**
 * title: 将 state 存储在 localStorage 中
 * desc: 刷新页面后，可以看到输入框中的内容被从 localStorage 中恢复了。
 */
import React from 'react';
import { useLocalStorageState } from 'gthooks';
export default function () {
    const [message, setMessage] = useLocalStorageState('use-local-storage-state-demo1', {
        defaultValue: 'Hello~',
    });
    return (<>
      <input value={message || ''} placeholder="Please enter some words..." onChange={(e) => setMessage(e.target.value)}/>
      <button style={{ margin: '0 8px' }} type="button" onClick={() => setMessage('Hello~')}>
        Reset
      </button>
      <button type="button" onClick={() => setMessage(undefined)}>
        Clear
      </button>
    </>);
}
//# sourceMappingURL=demo1.jsx.map