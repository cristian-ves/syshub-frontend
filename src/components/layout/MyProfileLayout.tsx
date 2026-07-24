import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { PROFILE_TABS } from "../../pages/profile/profile-tabs.config";
import { Badge } from "../common";
import { useAppSelector } from "../../store";

export const MyProfileLayout = () => {
    const { user } = useAppSelector(state => state.auth)

    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path: string) => {
        return location.pathname === path || location.pathname.startsWith(path + "/");
    };

    return (
        <div className="min-h-[calc(100vh-73px-105px-80px)] grow w-full max-w-5xl mx-auto px-6 py-10">
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6">
                <div className="max-w-2xl">
                    <Badge className="">
                        Área Personal
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white mt-4">
                        Bienvenido, <span className="text-brand-blue">{user?.fullName.split(' ')[0]}</span>
                    </h1>
                    <p className="text-slate-500 mt-3 text-lg">
                        Gestiona tu identidad académica y revisa tus contribuciones.
                    </p>
                </div>
            </header>

            <div className="flex gap-2 overflow-x-auto border-b border-slate-200 dark:border-slate-800 mb-8 no-scrollbar justify-center md:justify-start">
                {PROFILE_TABS.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.path}
                            onClick={() => navigate(tab.path)}
                            aria-label={tab.label}
                            className={`
                    shrink-0 cursor-pointer flex items-center gap-2 px-4 py-3 font-bold text-sm rounded-t-xl transition-all
                    ${isActive(tab.path)
                                    ? "text-brand-blue border-b-2 border-brand-blue bg-blue-50/40 dark:bg-blue-900/10"
                                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"}
                `}
                        >
                            <Icon size={18} />
                            <span className="hidden md:inline">{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            <div className="animate-in fade-in duration-300">
                <Outlet />
            </div>
        </div>
    );
};