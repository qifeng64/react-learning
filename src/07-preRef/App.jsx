import React, { useState } from "react";
import "./styles.css";
import { PriceWithStandard } from "./components";

const prices = [100, 200, 300, 400, 500, 600, 700];

export default function App() {
    const [price, setPrice] = useState(100);
    const [name, setName] = useState("");

    const onNameChange = (e) => setName(e.target.value);
    const onPriceChange = (e) => setPrice(Number(e.target.value));

    return (
        <div className="App">
            Type your name here: <input type="text" value={name} onChange={onNameChange} />
            <br />
            Select price here:{" "}
            <select value={price} onChange={onPriceChange}>
                {prices.map((price) => (
                    <option key={price} value={price}>
                        {price}$
                    </option>
                ))}
            </select>
            <br />
            <h4>Standard hook</h4>
            <PriceWithStandard price={price} />
        </div>
    );
}
