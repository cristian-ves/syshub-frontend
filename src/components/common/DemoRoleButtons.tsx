import React from "react";
import { ShieldCheck, GraduationCap, PenSquare, ArrowUpRight, Loader2 } from "lucide-react";
import { useDemoLogin, type DemoRole } from "../../hooks/useDemoLogin";
import { cn } from "../../helpers/combineClasses";

interface DemoRoleButtonsProps {
    className?: string;
}

const ROLES: {
    role: DemoRole;
    label: string;
    description: string;
    icon: React.ElementType;
    accent: string;
}[] = [
        {
            role: "admin",
            label: "Admin",
            description: "Full platform control",
            icon: ShieldCheck,
            accent: "text-brand-pink",
        },
        {
            role: "assistant",
            label: "Assistant",
            description: "Publish & curate content",
            icon: PenSquare,
            accent: "text-brand-blue dark:text-blue-400",
        },
        {
            role: "student",
            label: "Student",
            description: "Explore & contribute",
            icon: GraduationCap,
            accent: "text-emerald-500 dark:text-emerald-400",
        },
    ];

export const DemoRoleButtons: React.FC<DemoRoleButtonsProps> = ({ className }) => {
    const { loginAsDemo, loadingRole } = useDemoLogin();
    const isAnyLoading = loadingRole !== null;

    return (
        <div className={cn("w-full", className)}>
            <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                <p className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Try it instantly, no signup
                </p>
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ROLES.map(({ role, label, description, icon: Icon, accent }) => {
                    const isThisLoading = loadingRole === role;

                    return (
                        <button
                            key={role}
                            type="button"
                            onClick={() => loginAsDemo(role)}
                            disabled={isAnyLoading}
                            aria-busy={isThisLoading}
                            className={cn(
                                "group relative flex flex-col items-start gap-2 p-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all text-left overflow-hidden",
                                isAnyLoading
                                    ? "cursor-not-allowed opacity-60"
                                    : "hover:border-brand-blue dark:hover:border-blue-400 hover:shadow-lg hover:shadow-brand-blue/10 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer",
                                isThisLoading && "opacity-100 border-brand-blue dark:border-blue-400"
                            )}
                        >
                            {isThisLoading ? (
                                <Loader2
                                    size={16}
                                    className="absolute top-3 right-3 text-brand-blue dark:text-blue-400 animate-spin"
                                />
                            ) : (
                                <ArrowUpRight
                                    size={16}
                                    className="absolute top-3 right-3 text-slate-300 dark:text-slate-700 group-hover:text-brand-blue dark:group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                                />
                            )}

                            <div className={cn("p-2 rounded-lg bg-slate-50 dark:bg-slate-800", accent)}>
                                <Icon size={20} />
                            </div>

                            <div>
                                <span className="block font-bold text-slate-900 dark:text-white group-hover:text-brand-blue dark:group-hover:text-blue-400 transition-colors">
                                    {isThisLoading ? "Signing in..." : label}
                                </span>
                                <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                    {description}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};