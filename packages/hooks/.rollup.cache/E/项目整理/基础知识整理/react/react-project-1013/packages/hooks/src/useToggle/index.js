import { useState, useMemo } from 'react';
function useToggle(defaultValue = false, reverseValue) {
    const [state, setState] = useState(defaultValue);
    const actions = useMemo(() => {
        const reverseValueOrigin = (reverseValue === undefined ? !defaultValue : reverseValue);
        const toggle = () => setState(s => s === defaultValue ? reverseValueOrigin : defaultValue);
        const set = (value) => setState(value);
        const setLeft = () => setState(defaultValue);
        const setRight = () => setState(reverseValueOrigin);
        return {
            toggle,
            set,
            setLeft,
            setRight
        };
    }, [defaultValue, reverseValue]); // 添加依赖项
    return [state, actions];
}
export default useToggle;
//# sourceMappingURL=index.js.map