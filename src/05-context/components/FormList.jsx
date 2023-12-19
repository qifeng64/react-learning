import { useFormDate, useFormApi } from "../context/formContext";

export default function From() {
    const { name } = useFormDate();
    const { onNameChange } = useFormApi();
    return (
        <form action="">
            <label htmlFor="name">name: </label>
            <input type="text" id="name" value={name} onChange={onNameChange} />
        </form>
    );
}
