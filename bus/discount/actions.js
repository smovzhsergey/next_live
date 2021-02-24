import { types } from "./types";

export const discountsActions = {
    fillDiscounts: (discounts) => {
        return {
            type: types.FILL_DISCOUNTS,
            payload: discounts,
        }
    },
    fillSingleDiscount: (discount) => {
        return {
            type: types.FILL_SINGLE_DISCOUNT,
            payload: discount,
        }
    }
};
