import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { resetPasswordSchema, type ResetPasswordFormData } from "../schemas/reset-password.schema";
import { authService } from "../services/auth.service";
import { Input, Button, ErrorModal } from "../../../components/common";

export const ResetPasswordForm = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        mode: "onTouched",
    });

    const onSubmit = async (data: ResetPasswordFormData) => {
        if (!token) {
            setErrorMsg("The validation token is not valid.");
            return;
        }

        try {
            setLoading(true);
            setErrorMsg(null);

            await authService.resetPassword(token, data.password);

            toast.success("Password updated!", {
                description: "You can now login with the new credentials.",
            });

            navigate("/login");
        } catch (error: any) {
            setErrorMsg(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    label="New Password"
                    type="password"
                    {...register("password")}
                    error={errors.password?.message}
                    placeholder="••••••••"
                />

                <Input
                    label="Confirm Password"
                    type="password"
                    {...register("confirmPassword")}
                    error={errors.confirmPassword?.message}
                    placeholder="••••••••"
                />

                <Button
                    type="submit"
                    className="w-full mt-2"
                    isLoading={loading}
                >
                    Change Password
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