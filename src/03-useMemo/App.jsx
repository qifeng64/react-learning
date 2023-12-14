import { useState, useCallback, useMemo } from "react";

import CountriesList from "./CountriesList";
import SelectedCountry from "./SelectedCountry";

export default function Page({
    countries = [
        {
            country: "china",
        },
    ],
}) {
    // const countries = useMemo(
    //     () => [
    //         {
    //             country: "china",
    //         },
    //     ],
    //     []
    // );
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [savedCountry, setSavedCountry] = useState(countries[0]);

    // testFatherReder
    const [count, setCount] = useState(0);

    const list = useMemo(() => {
        return <CountriesList countries={countries} onCountryChanged={(c) => setSelectedCountry(c)} savedCountry={savedCountry} />;
    }, [countries, savedCountry]);

    const selected = useMemo(() => {
        return <SelectedCountry country={selectedCountry} onCountrySaved={() => setSavedCountry(selectedCountry)} />;
    }, [selectedCountry]);
    return (
        <>
            <h1>Country settings</h1>
            <div>
                {list}
                {selected}
            </div>
            <button onClick={() => setCount((c) => c + 1)}>{count}</button>
        </>
    );
}

// 父组件重渲染，子组件一定会重渲染 —— 即使子组件不接受props
// 官方提供 memo api 帮助组件在接受的 props 不改变的情况下跳过渲染

// 性能优化
// 子组件使用
// ! 一.不推荐
//  1. props 中对象用 useMemo 包裹返回
//  2. props 中函数用 useCallback 包裹返回
//  3. 子组件定义时使用 memo api
// ? 二.推荐✔
//  1. 在父组件中使用 useMemo 包裹需要使用的子组件返回一个变量，在 return jsx 中使用
