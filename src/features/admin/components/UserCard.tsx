import { Pencil, Trash2, Save, X, ShieldCheck, User as UserIcon, Shield } from "lucide-react";
import { Button, Input, Badge, Select } from "../../../components/common";
import { useUserCard } from "../../../hooks/admin/useUserCard";
import { ROLE_OPTIONS, getRoleLabel } from "../../../helpers/roleOptions.helper";
import type { UserResponse } from "../../../types/users.types";

interface Props {
    user: UserResponse;
}

export const UserCard = ({ user }: Props) => {
    const { register, onSubmit, isEditing, setIsEditing, isLoading, handleDelete, formState: { errors } } = useUserCard(user);

    return (
        <div className={`
            bg-white dark:bg-slate-900 rounded-[2rem] p-7 border transition-all duration-500
            ${isEditing
                ? 'border-brand-blue shadow-2xl shadow-blue-500/10 ring-1 ring-brand-blue/20 scale-[1.02]'
                : 'border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md'}
        `}>
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${user.enabled
                        ? 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/40 text-brand-blue'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                        }`}>
                        {/* 1 es ROLE_ADMIN según el helper */}
                        {user.roleId === 1 ? <ShieldCheck size={28} /> : <UserIcon size={28} />}
                    </div>
                    <div>
                        <h3 className="font-black text-xl text-slate-900 dark:text-white tracking-tight">
                            {user.nombreCompleto}
                        </h3>
                        <div className="flex gap-2 mt-1.5">
                            <Badge variant="info" noMargin className="px-3 py-0.5 text-[10px] font-black">
                                {getRoleLabel(user.roleId)}
                            </Badge>
                            {!user.enabled && (
                                <Badge variant="destructive" noMargin className="px-3 py-0.5 text-[10px] font-black animate-pulse">
                                    SUSPENDIDO
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">
                    {!isEditing ? (
                        <>
                            <Button variant="secondary" size="sm" onClick={() => setIsEditing(true)} className="rounded-xl">
                                <Pencil size={15} />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl" onClick={handleDelete}>
                                <Trash2 size={15} />
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)} className="rounded-xl">
                                <X size={15} />
                            </Button>
                            <Button size="sm" onClick={onSubmit} isLoading={isLoading} className="rounded-xl shadow-blue-500/40">
                                <Save size={15} />
                            </Button>
                        </>
                    )}
                </div>
            </div>

            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <Input label="Usuario" {...register("username")} disabled={!isEditing} error={errors.username?.message} className="bg-slate-50/50" />
                <Input label="Correo Electrónico" {...register("email")} disabled={!isEditing} error={errors.email?.message} className="bg-slate-50/50" />

                {isEditing ? (
                    <Select
                        label="Rol en la Plataforma"
                        options={ROLE_OPTIONS}
                        labelKey="label" // "Administrador", "Auxiliar", etc.
                        valueKey="id"    // 1, 2, 3
                        error={errors.rolId?.message}
                        {...register("rolId")}
                    />
                ) : (
                    <div className="space-y-1.5">
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 italic opacity-80">
                            Rol Asignado
                        </label>
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                            <Shield size={16} className="text-brand-blue" />
                            <span className="text-sm font-semibold uppercase tracking-wider">
                                {getRoleLabel(user.roleId)}
                            </span>
                        </div>
                    </div>
                )}

                <Input label="Registro Académico" {...register("registroAcademico")} disabled={!isEditing} error={errors.registroAcademico?.message} className="bg-slate-50/50" />

                {isEditing && (
                    <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-100 dark:border-slate-800 mt-2">
                        <Input label="Nueva Contraseña" type="password" placeholder="Opcional" {...register("password")} error={errors.password?.message} />
                        <div className="flex items-center gap-4 px-2 h-full pt-6">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" {...register("enabled")} className="sr-only peer" />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue"></div>
                                <span className="ml-3 text-sm font-bold text-slate-700 dark:text-slate-300 italic opacity-80">
                                    Cuenta Habilitada
                                </span>
                            </label>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};