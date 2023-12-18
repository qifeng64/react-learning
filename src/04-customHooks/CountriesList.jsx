export default function CountriesList({ countries, onCountryChanged, savedCountry }) {
    console.log("render CountriesList");
    return (
        <>
            <button onClick={() => onCountryChanged({ country: "Zh" })}>重渲染父组件</button>
        </>
    );
}
