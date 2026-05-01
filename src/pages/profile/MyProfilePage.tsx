import { useState } from "react";
import { useAppSelector } from "../../store";

export const MyProfilePage = () => {
    const [activeTab, setActiveTab] = useState<'info' | 'projects'>('info');
    const { user } = useAppSelector(state => state.auth);

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            <header className="mb-8">
                <h1 className="text-3xl font-black dark:text-white">Mi Perfil</h1>
                <p className="text-slate-500">Gestiona tu información y proyectos subidos</p>
            </header>

            <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 mb-8">
                <button
                    onClick={() => setActiveTab('info')}
                    className={`cursor-pointer pb-4 px-2 font-bold text-sm transition-all ${activeTab === 'info' ? 'border-b-2 border-brand-blue text-brand-blue' : 'text-slate-400'}`}
                >
                    Información Personal
                </button>
                <button
                    onClick={() => setActiveTab('projects')}
                    className={`cursor-pointer pb-4 px-2 font-bold text-sm transition-all ${activeTab === 'projects' ? 'border-b-2 border-brand-blue text-brand-blue' : 'text-slate-400'}`}
                >
                    Mis Proyectos
                </button>
            </div>

            {/* Contenido Dinámico */}
            {/* <div className="animate-in fade-in duration-300">
                {activeTab === 'info' ? (
                    <ProfileForm user={user} />
                ) : (
                    <MyProjectsList />
                )}
            </div> */}
        </div>
    );
};