import { useState } from "react";

function FormList() {
    console.log("子组件渲染了");
    return <div>FormList</div>;
}

export default function App() {
    const [counter, setCounter] = useState(0);
    console.log("父组件渲染了");
    const handleIncCounter = () => {
        setCounter(counter + 1);
    };
    return (
        <>
            <FormList></FormList>
            <button onClick={handleIncCounter}>{counter}</button>
        </>
    );
}
