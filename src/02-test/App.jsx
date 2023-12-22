import { memo, useCallback, useMemo, useState } from "react";
import FormList from "./FormList";

// function FormList() {
//     console.log("子组件渲染了");
//     return <div>FormList</div>;
// }

let countries = [
    { name: "cdf1", id: 1 },
    { name: "cdf2", id: 2 },
    { name: "cdf3", id: 3 },
    { name: "cdf4", id: 4 },
    { name: "cdf5", id: 5 },
    { name: "cdf6", id: 6 },
];
const ChildrenComponent = () => {
    console.log("ChildrenComponent render");
    return <div>ChildrenComponent</div>;
};
export default function App() {
    const [counter, setCounter] = useState(0);
    const [fresh, setFresh] = useState(false);
    console.log("父组件渲染了");
    const handleIncCounter = () => {
        setCounter(counter + 1);
    };

    const handleAdd = () => {
        countries.unshift({
            name: "niuboyi",
            id: 8,
        });
        setFresh(!fresh);
    };
    return (
        <>
            <button onClick={handleAdd}>add item</button>
            <FormList countries={countries}>
                <ChildrenComponent></ChildrenComponent>
            </FormList>
            <button onClick={handleIncCounter}>{counter}</button>
        </>
    );
}
