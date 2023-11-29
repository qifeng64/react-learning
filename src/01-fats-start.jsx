import React, { useState } from "react";

const App = () => {
    // state
    const [count, setCount] = useState(0);

    const color = "red";

    // 自定义事件
    const handleClick = () => {
        alert("You click me");
    };
    function mybuttonClick() {
        setCount(count + 1);
    }

    // 列表渲染
    const list = [
        { id: 1, name: "one" },
        { id: 2, name: "two" },
        { id: 3, name: "three" },
    ];
    const listLi = list.map((item) => <li key={item.id}>{item.name}</li>);

    return (
        <>
            <div>App</div>
            <h1 style={{ color }}>Hello World</h1>
            <button onClick={() => handleClick()}>按钮</button>
            <ul>{listLi}</ul>
            {/* props, 自定义props */}
            <MyButton count={count} onClickEvent={mybuttonClick} />
        </>
    );
};

// 函数式组件;
function MyButton({ count, onClickEvent }) {
    return <button onClick={() => onClickEvent()}>Click {count} time</button>;
}

export default App;
