import React from "react";
import FormList from "./cpns/FormList";
import WithSomeLogic from "./withCpn/WithSomeLogic";

export default function App() {
    // 理论上返回一个函数，这个函数返回一个组件
    // const higherFormList = WithSomeLogic(FormList);
    // 函数式组件，也是一个会返回jsx的函数，所以用首字母大写的变量接收，其可被看作是一个组件
    const HigherFormList = WithSomeLogic(FormList, "FormList");
    return (
        <>
            <div>App</div>
            {/* <FormList name="niuboyi" /> */}
            {/* 看作函数时调用 */}
            {/* {higherFormList({ name: "niuboyi" })} */}
            {/* 看作组件时调用 */}
            <HigherFormList />
        </>
    );
}
