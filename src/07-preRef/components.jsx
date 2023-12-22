import { usePreviousStandard } from "./hooks";

export const PriceWithStandard = ({ price }) => {
    const prevPrice = usePreviousStandard(price);
    console.log(prevPrice);
    const icon = prevPrice && prevPrice < price ? "😡" : "😊";
    console.log("pice render");
    return (
        <div>
            Current price: {price}; <br />
            Previous price: {prevPrice} {icon}
        </div>
    );
};
