import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { loginSchema, type LoginFormValues } from "../schemas/login.schema";
import { authService } from "../services/auth.service";
import { useAppDispatch, useAppSelector, type RootState } from "../../../store";
import { Input, Button, ErrorModal } from "../../../components/common";
import { loginFailure, loginStart, loginSuccess } from "../../../store/slices/authSlice";

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading } = useAppSelector((state: RootState) => state.auth);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onTouched",
    });

    const onSubmit = async (data: LoginFormValues) => {
        try {
            dispatch(loginStart());
            const response = await authService.login(data);

            dispatch(loginSuccess({
                username: {
                    username: response.username,
                    role: response.role
                },
                token: response.token
            }));

            toast.success(`¡Qué tal, ${response.username}! Bienvenido.`);
            navigate("/dashboard");
        } catch (error: any) {
            dispatch(loginFailure(error));
            setErrorMsg(error);
        }
    };

    return (
        <div className="w-full max-w-md space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    label="Usuario"
                    {...register("username")}
                    error={errors.username?.message}
                    placeholder="Tu nombre de usuario"
                />

                <Input
                    label="Contraseña"
                    type="password"
                    {...register("password")}
                    error={errors.password?.message}
                    placeholder="••••••••"
                />

                <div className="flex justify-end">
                    <Link
                        to="/forgot-password"
                        className="text-sm font-semibold text-brand-blue dark:text-blue-400 hover:underline"
                    >
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Entrando..." : "Iniciar Sesión"}
                </Button>
            </form>

            <ErrorModal
                isOpen={!!errorMsg}
                onClose={() => setErrorMsg(null)}
                message={errorMsg || ""}
            />
        </div>
    );
};