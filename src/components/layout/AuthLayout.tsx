import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
    return (
        <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 transition-colors duration-300 flex flex-col">
            <Outlet />
        </div>
    );
};