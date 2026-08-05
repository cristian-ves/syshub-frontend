import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { loginSchema, type LoginFormValues } from "../schemas/login.schema";
import { useAppDispatch, useAppSelector, type RootState } from "../../../store";
import { Input, Button, ErrorModal, DemoRoleButtons } from "../../../components/common";
import { loginUser } from "../../../store/slices/authSlice";

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
            const response = await dispatch(loginUser(data)).unwrap();
            toast.success(`Hey, ${response.username}! Welcome.`);
            navigate("/profile");
        } catch (error: any) {
            setErrorMsg(error);
        }
    };

    return (
        <div className="w-full max-w-md space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    label="Username"
                    {...register("username")}
                    error={errors.username?.message}
                    placeholder="Your username"
                />

                <Input
                    label="Password"
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
                        Forgot password?
                    </Link>
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    isLoading={loading}
                >
                    Login
                </Button>
            </form>


            <DemoRoleButtons />

            <ErrorModal
                isOpen={!!errorMsg}
                onClose={() => setErrorMsg(null)}
                message={errorMsg || ""}
            />
        </div>
    );
};