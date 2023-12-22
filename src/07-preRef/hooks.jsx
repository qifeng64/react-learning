import { useRef, useEffect } from "react";

export const usePreviousStandard = (value) => {
    console.log("hooks", value);
    const ref = useRef();
    console.log("ref", ref);
    useEffect(() => {
        ref.current = value;
        console.log("after render", ref.current); // ref 改变不会 re-render；re-render 不会重置 ref
    }, [value]);

    return ref.current;
};
