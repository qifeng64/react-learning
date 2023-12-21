import React from "react";

export default function FormList({ name, onChange }) {
    const handleBtnClick = () => {
        console.log("click>>>>>>>>>>>");
    };
    return (
        <>
            <label htmlFor="name">姓名</label>
            <input type="text" id="name" value={name} onChange={onChange} />
            <button onClick={handleBtnClick}>click me</button>
        </>
    );
}
