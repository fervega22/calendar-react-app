import { types } from "../types/types";

//Setea en true el openModal en el state (redux)
export const uiOpenModal = () => ({
    type: types.uiOpenModal
});

//Setea en false el openModal en el state (redux)
export const uiCloseModal = () => ({
    type: types.uiCloseModal
});