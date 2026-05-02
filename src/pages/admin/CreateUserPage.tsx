import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, UserPlus, GraduationCap, Lock, Info } from "lucide-react";
import { Button, Input, Badge, Select, ErrorModal } from "../../components/common";
import { useCreateUser } from "../../hooks/admin/useCreateUser";
import { ROLE_OPTIONS } from "../../helpers/roleOptions.helper";
import { CARRERAS } from "../../helpers/carreras.helper";

export const CreateUserPage: React.FC = () => {
    const navigate = useNavigate();
    const {
        register,
        onSubmit,
        errorMsg,
        setErrorMsg,
        isSubmitting,
        formState: { errors }
    } = useCreateUser();

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <header className="mb-12">
                <button
                    onClick={() => navigate("/users")}
                    className="cursor-pointer flex items-center gap-2 text-slate-500 hover:text-brand-blue transition-colors mb-6 text-sm font-medium"
                >
                    <ChevronLeft size={16} />
                    Volver a la lista
                </button>
                <Badge className="mt-4">Administración</Badge>
                <h1 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white mt-2">
                    Registrar nuevo <span className="text-brand-blue">integrante</span>
                </h1>
            </header>

            <form
                onSubmit={onSubmit}
                className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden"
            >
                <section className="p-8 md:p-10 space-y-6">
                    <div className="flex items-center gap-2 mb-2 text-brand-blue">
                        <Info size={20} />
                        <h2 className="font-bold uppercase tracking-wider text-xs">Identidad del Usuario</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <Input
                                label="Nombre Completo"
                                placeholder="Ej. Juan Pérez"
                                {...register("nombreCompleto")}
                                error={errors.nombreCompleto?.message}
                            />
                        </div>
                        <Input
                            label="Nombre de Usuario"
                            placeholder="jperez"
                            {...register("username")}
                            error={errors.username?.message}
                        />
                        <Input
                            label="Correo Electrónico"
                            placeholder="juan.perez@correo.com"
                            {...register("email")}
                            error={errors.email?.message}
                        />
                    </div>
                </section>

                <hr className="border-slate-100 dark:border-slate-800" />

                <section className="p-8 md:p-10 space-y-6">
                    <div className="flex items-center gap-2 mb-6 text-brand-blue">
                        <GraduationCap size={20} />
                        <h2 className="font-bold uppercase tracking-wider text-xs">Academia y Permisos</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Registro Académico"
                            placeholder="202301234"
                            {...register("registroAcademico")}
                            error={errors.registroAcademico?.message}
                        />
                        <Select
                            label="Rol Asignado"
                            options={ROLE_OPTIONS}
                            labelKey="label"
                            valueKey="id"
                            {...register("rolId")}
                            error={errors.rolId?.message}
                        />
                        <div className="md:col-span-2">
                            <Select
                                label="Carrera"
                                options={CARRERAS}
                                labelKey="nombre"
                                valueKey="id"
                                {...register("carreraId")}
                                error={errors.carreraId?.message}
                            />
                        </div>
                    </div>
                </section>

                <hr className="border-slate-100 dark:border-slate-800" />

                <section className="p-8 md:p-10">
                    <div className="flex items-center gap-2 mb-6 text-brand-blue">
                        <Lock size={20} />
                        <h2 className="font-bold uppercase tracking-wider text-xs">Seguridad Inicial</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Contraseña"
                            type="password"
                            placeholder="Mínimo 8 caracteres"
                            {...register("password")}
                            error={errors.password?.message}
                            required
                        />
                        <div className="flex items-center gap-4 px-2 h-full pt-6">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" {...register("enabled")} className="sr-only peer" />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue"></div>
                                <span className="ml-3 text-sm font-bold text-slate-700 dark:text-slate-300 italic opacity-80">
                                    Activar cuenta inmediatamente
                                </span>
                            </label>
                        </div>
                    </div>
                </section>

                <footer className="p-8 md:p-10 bg-slate-50/50 dark:bg-slate-800/20">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-sm text-slate-500 max-w-xs text-center md:text-left">
                            Para que el usuario cree su contrasena tiene que realizar el proceso de recuperacion de credenciales.
                        </div>
                        <Button
                            type="submit"
                            className="w-full md:w-auto px-12 py-7 text-lg shadow-xl shadow-brand-blue/20 gap-3"
                            isLoading={isSubmitting}
                        >
                            <UserPlus size={20} />
                            Crear Usuario Ahora
                        </Button>
                    </div>
                </footer>
            </form>

            <ErrorModal
                isOpen={!!errorMsg}
                onClose={() => setErrorMsg(null)}
                message={errorMsg || ""}
            />
        </div>
    );
};