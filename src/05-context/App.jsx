import FormList from "./components/FormList";
import BottomBtns from "./components/BottomBtns";

import { ThemeContext } from "./context/themeContext";
import { FormDataProvider } from "./context/formContext";

export default function App() {
    console.log("App render>>>>>>>>>>>>>>>>>");
    return (
        <FormDataProvider>
            <ThemeContext.Provider value="light">
                <FormList />
                <BottomBtns />
            </ThemeContext.Provider>
        </FormDataProvider>
    );
}
