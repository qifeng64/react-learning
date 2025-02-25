import { memo, useCallback, useDebugValue, useMemo, useState } from "react";

function ModalBase({ isOpen, close }) {
    return isOpen ? (
        <>
            <button onClick={close}>close</button>
            <h1>我是一个弹窗</h1>
        </>
    ) : null;
}

export const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    // 便于调试，在用到该自定义hooks的组件中，会给该hooks设置一个值，如 Modal: "useDebugValue open"
    useDebugValue(isOpen ? "useDebugValue open" : "useDebugValue close");
    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);
    const Dialog = useCallback(() => <ModalBase isOpen={isOpen} close={close}></ModalBase>, [isOpen, close]);
    console.log("render useModal>>>>>>>>>>>return new Object");
    return useMemo(
        () => ({
            isOpen,
            open,
            close,
            Dialog,
        }),
        [isOpen, open, close, Dialog]
    );
};

// export const SettingButton = memo(() => {
//     const { open, Dialog } = useModal();
//     console.log("render SettingButton>>>>>>>>>>>");
//     return (
//         <>
//             <button onClick={open}>打开弹窗</button>
//             <Dialog></Dialog>
//         </>
//     );
// });

// export const Noramal = () => {
//     let normalCount = 0;
//     const setNormalCount = () => {
//         normalCount = normalCount + 1;
//     };
//     console.log("render Noramal>>>>>>>>>>>");
//     return { normalCount, setNormalCount };
// };
