import { atom } from "recoil";

export const sideBarOpen = atom({
    key: 'sideBarOpen',
    default: window.screen.width > 1280 ? true : false
})