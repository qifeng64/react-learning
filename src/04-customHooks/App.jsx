import { useState, useMemo } from "react";

import CountriesList from "./CountriesList";
import SelectedCountry from "./SelectedCountry";

import { useModal } from "./useModal";

export default function Page({
    countries = [
        {
            country: "china",
        },
    ],
}) {
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

    const { open, Dialog } = useModal();

    console.log("render APP>>>>>>>>>>>");
    return (
        <>
            <h1>Country settings</h1>
            <div>
                {list}
                {selected}
                <button onClick={open}>打开弹窗</button>
                <Dialog></Dialog>
                {/* <SettingButton /> */}
            </div>
            <button onClick={() => setCount((c) => c + 1)}>{count}</button>
        </>
    );
}
