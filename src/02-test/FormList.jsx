import React, { memo, useEffect } from "react";

const Item = memo(({ item }) => {
    useEffect(() => {
        console.log(`Item MOUNT`);
    });
    console.log("Item render");
    return <div>{item.name}</div>;
});

export default function FormList({ countries, children }) {
    useEffect(() => {
        console.log(`FormList MOUNT`);
    });
    console.log("子组件渲染了");

    return (
        <div>
            {children}
            {countries.map((item, index) => (
                <Item key={item.id} item={item}></Item>
            ))}
        </div>
    );
}
