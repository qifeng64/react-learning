import { createContext, useContext, useMemo, useReducer } from "react";

const FormDataContext = createContext();
const FormAPIContext = createContext();

const reducer = (state, action) => {
    console.log("ccccccccccccccccccccccccccccc");
    switch (action.type) {
        case "onSave":
            return;
        case "onNameChange":
            return { ...state, name: action.name };
        default:
            return;
    }
};

export const FormDataProvider = ({ children }) => {
    const [state, dispath] = useReducer(reducer, { name: "" });
    console.log(state);
    console.log("FormDataProvider render>>>>>>>>>>>>>>");

    const api = useMemo(() => {
        const onSave = () => {
            // send the request to the backend here
        };

        const onNameChange = (e) => {
            console.log("ccccccccccccccccccccccccccccc", e);
            dispath({ type: "onNameChange", name: e.target.value });
        };

        return {
            onSave,
            onNameChange,
        };
    }, []);

    return (
        <FormDataContext.Provider value={api}>
            <FormAPIContext.Provider value={state}>{children}</FormAPIContext.Provider>
        </FormDataContext.Provider>
    );
};

export const useFormDate = () => useContext(FormDataContext);
export const useFormApi = () => useContext(FormAPIContext);
