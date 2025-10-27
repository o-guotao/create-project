import { useEffect, useLayoutEffect } from "react";
type EffectHookType = typeof useEffect | typeof useLayoutEffect;
export declare const createUpdateEffect: (effectHook: EffectHookType) => (EffectHookType);
export default createUpdateEffect;
