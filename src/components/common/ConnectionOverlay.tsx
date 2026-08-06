import React from "react";
import { ServerCog } from "lucide-react";
import { useAppSelector } from "../../store";

export const ConnectionOverlay: React.FC = () => {
    const isWakingUp = useAppSelector((state) => state.connection.isWakingUp);

    if (!isWakingUp) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="flex flex-col items-center gap-4 px-8 py-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl max-w-sm text-center">
                <div className="relative">
                    <div className="absolute inset-0 bg-brand-blue/20 blur-xl rounded-full animate-pulse" />
                    <ServerCog size={40} className="relative text-brand-blue animate-spin [animation-duration:3s]" />
                </div>
                <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                        Waking up the server
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Our free-tier backend sleeps when idle. This can take up to a minute on first load — hang tight.
                    </p>
                </div>
            </div>
        </div>
    );
};