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
