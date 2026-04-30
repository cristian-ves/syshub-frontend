import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, ErrorModal, Input, Select } from '../../../components/common';
import { registerSchema, type RegisterFormValues } from '../schemas/register.schema';
import { useAppDispatch, useAppSelector, type RootState } from '../../../store';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../store/slices/authSlice';
import { toast } from 'sonner';
import { CARRERAS } from '../../../helpers/carreras.helper';

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
            const { confirmPassword, ...registerDto } = data;
            await dispatch(registerUser(registerDto)).unwrap();
            toast.success("Cuenta creada exitosamente");
            navigate('/dashboard');
        } catch (error: any) {
            setErrorMsg(error);
        }
    };

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
                        placeholder="202012345"
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
                    options={CARRERAS}
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