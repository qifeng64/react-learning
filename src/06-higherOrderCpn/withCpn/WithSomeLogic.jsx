import React, { useEffect } from "react";
import { useState } from "react";

export default function WithSomeLogic(Component, { message }) {
    const [name, setName] = useState("niuboyi");
    useEffect(() => {
        console.log(`${message}组件挂载了`);
    });
    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    return (props) => <Component name={name} onChange={handleNameChange} />;
}
