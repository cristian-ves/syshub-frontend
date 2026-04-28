import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Select } from '../../../components/common';
import { registerSchema, type RegisterFormValues } from '../schemas/register.schema';

export const RegisterForm: React.FC = () => {
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

    const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
        const { confirmPassword, ...registerDto } = data;
    };

    const carreras = [
        { id: 1, nombre: "Ingeniería en Ciencias y Sistemas" },
        { id: 2, nombre: "Ingeniería Mecánica" },
        { id: 3, nombre: "Ingeniería Mecánica Industrial" },
        { id: 4, nombre: "Ingeniería Civil" },
        { id: 5, nombre: "Ingeniería Industrial" },
    ];

    return (
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

            <Button type="submit" className="w-full py-4 mt-2">
                Crear Cuenta
            </Button>
        </form>
    );
};