import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = (): boolean => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

interface UIState {
    darkMode: boolean;
}

const initialState: UIState = {
    darkMode: getInitialTheme(),
};

if (initialState.darkMode) {
    document.documentElement.classList.add("dark");
} else {
    document.documentElement.classList.remove("dark");
}

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
            const newTheme = state.darkMode ? "dark" : "light";

            localStorage.setItem("theme", newTheme);

            if (state.darkMode) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        },
    },
});

export const { toggleDarkMode } = uiSlice.actions;
export default uiSlice.reducer;
