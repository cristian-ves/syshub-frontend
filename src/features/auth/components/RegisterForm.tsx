import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, ErrorModal, Input, Select } from '../../../components/common';
import { registerSchema, type RegisterFormValues } from '../schemas/register.schema';
import { useAppDispatch, useAppSelector, type RootState } from '../../../store';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../store/slices/authSlice';
import { toast } from 'sonner';
import { MAJORS } from '../../../helpers/majors.helper';

export const RegisterForm: React.FC = () => {

    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema) as any,
        defaultValues: {
            fullName: '',
            username: '',
            academicRecord: '',
            email: '',
            password: '',
            confirmPassword: '',
            majorId: 1
        }
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading } = useAppSelector((state: RootState) => state.auth);

    const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
        try {
            const { confirmPassword, ...registerDto } = data;
            await dispatch(registerUser(registerDto)).unwrap();
            toast.success("Account created successfully");
            navigate('/profile');
        } catch (error: any) {
            setErrorMsg(error);
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 text-left"
            >
                <Input
                    label="Full Name"
                    placeholder="e.g. John Smith"
                    error={errors.fullName?.message}
                    {...register('fullName')}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Username"
                        placeholder="username_example"
                        error={errors.username?.message}
                        {...register('username')}
                    />
                    <Input
                        label="Academic Record"
                        placeholder="202012345"
                        error={errors.academicRecord?.message}
                        {...register('academicRecord')}
                    />
                </div>

                <Input
                    label="Email"
                    type="email"
                    placeholder="student@cunoc.edu.gt"
                    error={errors.email?.message}
                    {...register('email')}
                />

                <Select
                    label="Major"
                    options={MAJORS}
                    error={errors.majorId?.message}
                    {...register('majorId', { valueAsNumber: true })}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        error={errors.password?.message}
                        {...register('password')}
                    />
                    <Input
                        label="Confirm password"
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
                    Create account
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