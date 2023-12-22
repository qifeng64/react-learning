import React, { useEffect, useRef, useState } from "react";

const Handle = (props) => <div {...props} className="sidebar-handle" />;

export default function DraggableSidebar({ children }) {
    const [width, setWidth] = useState(240);
    const [startMoving, setStartMoving] = useState(false);
    const ref = useRef(null);

    console.log("DraggableSidebar render");

    useEffect(() => {
        if (!ref.current) return;
        const changeWidth = (e) => {
            if (!startMoving) return;
            if (!ref.current) return;

            const left = ref.current.getBoundingClientRect().left;
            const wi = e.clientX - left;

            setWidth(wi);
        };

        ref.current.addEventListener("mousemove", changeWidth);

        return () => ref.current?.removeEventListener("mousemove", changeWidth);
    }, [startMoving, ref]);

    const onStartMoving = () => {
        console.log("开始拖动");
        setStartMoving(true);
    };

    const onEndMoving = () => {
        console.log("结束拖动");
        setStartMoving(false);
    };
    return (
        <div className="sidebar" ref={ref} onMouseLeave={onEndMoving} style={{ width: `${width}px` }}>
            <Handle onMouseDown={onStartMoving} onMouseLeave={onEndMoving}></Handle>
            {children}
        </div>
    );
}
