import { useMemo, useState } from "react";

import FormList from "./components/FormList";
import BottomBtns from "./components/BottomBtns";

import { FormContext } from "./context/formContext";
import { ThemeContext } from "./context/themeContext";

export default function App() {
    const [name, setName] = useState("");
    console.log("App render>>>>>>>>>>>>>>>>>");
    function handleNameChange(e) {
        setName(e.target.value);
    }

    return (
        <ThemeContext.Provider value="light">
            <FormContext.Provider value={{ name: name, onClick: handleNameChange }}>
                {useMemo(
                    () => (
                        <FormList />
                    ),
                    []
                )}
                {useMemo(
                    () => (
                        <BottomBtns />
                    ),
                    []
                )}
            </FormContext.Provider>
        </ThemeContext.Provider>
    );
}
