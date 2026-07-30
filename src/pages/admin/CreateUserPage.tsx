import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, UserPlus, GraduationCap, Lock, Info } from "lucide-react";
import { Button, Input, Badge, Select, ErrorModal } from "../../components/common";
import { useCreateUser } from "../../hooks/admin/useCreateUser";
import { ROLE_OPTIONS } from "../../helpers/roleOptions.helper";
import { MAJORS } from "../../helpers/majors.helper";

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
                    Back to list
                </button>
                <Badge className="mt-4">Administration</Badge>
                <h1 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white mt-2">
                    Register new <span className="text-brand-blue">member</span>
                </h1>
            </header>

            <form
                onSubmit={onSubmit}
                className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-4xl shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden"
            >
                <section className="p-8 md:p-10 space-y-6">
                    <div className="flex items-center gap-2 mb-2 text-brand-blue">
                        <Info size={20} />
                        <h2 className="font-bold uppercase tracking-wider text-xs">User Identity</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <Input
                                label="Full Name"
                                placeholder="e.g. John Doe"
                                {...register("fullName")}
                                error={errors.fullName?.message}
                            />
                        </div>
                        <Input
                            label="Username"
                            placeholder="jdoe"
                            {...register("username")}
                            error={errors.username?.message}
                        />
                        <Input
                            label="Email Address"
                            placeholder="john.doe@email.com"
                            {...register("email")}
                            error={errors.email?.message}
                        />
                    </div>
                </section>

                <hr className="border-slate-100 dark:border-slate-800" />

                <section className="p-8 md:p-10 space-y-6">
                    <div className="flex items-center gap-2 mb-6 text-brand-blue">
                        <GraduationCap size={20} />
                        <h2 className="font-bold uppercase tracking-wider text-xs">Academics and Permissions</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Academic Record"
                            placeholder="202301234"
                            {...register("academicRecord")}
                            error={errors.academicRecord?.message}
                        />
                        <Select
                            label="Assigned Role"
                            options={ROLE_OPTIONS}
                            labelKey="label"
                            valueKey="id"
                            {...register("roleId")}
                            error={errors.roleId?.message}
                        />
                        <div className="md:col-span-2">
                            <Select
                                label="Major"
                                options={MAJORS}
                                labelKey="name"
                                valueKey="id"
                                {...register("majorId")}
                                error={errors.majorId?.message}
                            />
                        </div>
                    </div>
                </section>

                <hr className="border-slate-100 dark:border-slate-800" />

                <section className="p-8 md:p-10">
                    <div className="flex items-center gap-2 mb-6 text-brand-blue">
                        <Lock size={20} />
                        <h2 className="font-bold uppercase tracking-wider text-xs">Initial Security</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Minimum 8 characters"
                            {...register("password")}
                            error={errors.password?.message}
                            required
                        />
                        <div className="flex items-center gap-4 px-2 md:h-full pt-2 md:pt-6">
                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" {...register("enabled")} className="sr-only peer" />

                                <div className="relative shrink-0 w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue"></div>

                                <span className="ml-3 text-sm font-bold text-slate-700 dark:text-slate-300 italic opacity-80">
                                    Activate account immediately
                                </span>
                            </label>
                        </div>
                    </div>
                </section>

                <footer className="p-8 md:p-10 bg-slate-50/50 dark:bg-slate-800/20">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-sm text-slate-500 max-w-xs text-center md:text-left">
                            For the user to create their password, they must go through the credential recovery process.
                        </div>
                        <Button
                            type="submit"
                            className="w-full md:w-auto px-12 py-7 text-lg shadow-xl shadow-brand-blue/20 gap-3"
                            isLoading={isSubmitting}
                        >
                            <UserPlus size={20} />
                            Create User Now
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