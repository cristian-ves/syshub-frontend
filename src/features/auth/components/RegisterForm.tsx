import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, ErrorModal, Input, Select } from '../../../components/common';
import { registerSchema, type RegisterFormValues } from '../schemas/register.schema';
import { authService } from '../services/auth.service';
import { useAppDispatch, useAppSelector, type RootState } from '../../../store';
import { useNavigate } from 'react-router-dom';
import { loginFailure, loginStart, loginSuccess } from '../../../store/slices/authSlice';

export const RegisterForm: React.FC = () => {

    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema) as any,
        defaultValues: {
            nombreCompleto: '',
            username: '',
            registroAcademico: '',
            email: '',
            password: '',
            confirmPassword: '',
            idCarrera: 1
        }
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading } = useAppSelector((state: RootState) => state.auth);

    const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
        try {
            dispatch(loginStart());
            const { confirmPassword, ...registerDto } = data;

            const response = await authService.register(registerDto);

            dispatch(loginSuccess({
                token: response.token,
                user: { username: response.username, role: response.role }
            }))

            console.log("adentro cerote")
            navigate('/dashboard')
        } catch (error: any) {
            dispatch(loginFailure(error));
            setErrorMsg(error);
        }
    };

    const carreras = [
        { id: 1, nombre: "Ingeniería en Ciencias y Sistemas" },
        { id: 2, nombre: "Ingeniería Mecánica" },
        { id: 3, nombre: "Ingeniería Mecánica Industrial" },
        { id: 4, nombre: "Ingeniería Civil" },
        { id: 5, nombre: "Ingeniería Industrial" },
    ];

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar text-left"
            >
                <Input
                    label="Nombre Completo"
                    placeholder="Ej. Alejandro Pérez"
                    error={errors.nombreCompleto?.message}
                    {...register('nombreCompleto')}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Usuario"
                        placeholder="ale_perez"
                        error={errors.username?.message}
                        {...register('username')}
                    />
                    <Input
                        label="Registro Académico"
                        placeholder="202131936"
                        error={errors.registroAcademico?.message}
                        {...register('registroAcademico')}
                    />
                </div>

                <Input
                    label="Correo Electrónico"
                    type="email"
                    placeholder="estudiante@cunoc.edu.gt"
                    error={errors.email?.message}
                    {...register('email')}
                />

                <Select
                    label="Carrera"
                    options={carreras}
                    error={errors.idCarrera?.message}
                    {...register('idCarrera', { valueAsNumber: true })}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Contraseña"
                        type="password"
                        placeholder="••••••••"
                        error={errors.password?.message}
                        {...register('password')}
                    />
                    <Input
                        label="Confirmar"
                        type="password"
                        placeholder="••••••••"
                        error={errors.confirmPassword?.message}
                        {...register('confirmPassword')}
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full py-4 mt-2"
                    isLoading={loading}
                >
                    Crear Cuenta
                </Button>
            </form>

            <ErrorModal
                isOpen={!!errorMsg}
                onClose={() => setErrorMsg(null)}
                message={errorMsg || ''}
            />

        </>

    );
};