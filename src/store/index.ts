import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import {
    useDispatch,
    useSelector,
    type TypedUseSelectorHook,
} from "react-redux";
import uiSlice from "./slices/uiSlice";
import projectSlice from "./slices/projectSlice";
import myProjectsSlice from "./slices/myProjectsSlice";
import adminSlice from "./slices/adminSlice";
import articleSlice from "./slices/articleSlice";
import favoriteArticleSlice from "./slices/favoriteArticleSlice";
import connectionSlice, { setWakingUp } from "./slices/connectionSlice";
import { registerConnectionListener } from "../api/connectionTracker";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiSlice,
        projects: projectSlice,
        myProjects: myProjectsSlice,
        admin: adminSlice,
        articles: articleSlice,
        favoriteArticles: favoriteArticleSlice,
        connection: connectionSlice,
    },
});

registerConnectionListener((isWakingUp) =>
    store.dispatch(setWakingUp(isWakingUp))
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
