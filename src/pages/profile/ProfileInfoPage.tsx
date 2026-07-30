import { useState } from "react";
import { Pencil, Save, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store";
import { Input, Button } from "../../components/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    updateProfileSchema,
    type UpdateProfileFormValues,
} from "../../features/profile/schemas/update-profile.schema";
import { updateUserProfile } from "../../store/slices/authSlice";
import { toast } from "sonner";
import SantaAvatar from "../../assets/santa.svg";

export const ProfileInfoPage = () => {
    const { user, loading } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const [isEditing, setIsEditing] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateProfileFormValues>({
        resolver: zodResolver(updateProfileSchema) as any,
        defaultValues: {
            fullName: user?.fullName,
            username: user?.username,
            email: user?.email,
            academicRecord: user?.academicRecord,
            majorId: user?.majorId,
        },
    });

    const onSubmit = async (data: UpdateProfileFormValues) => {
        if (!user?.id) return;

        try {
            const { confirmPassword, ...payload } = data;

            if (!payload.password) {
                delete payload.password;
            }

            await dispatch(
                updateUserProfile({
                    id: user.id,
                    data: payload,
                })
            ).unwrap();

            toast.success("Profile updated");
            setIsEditing(false);
        } catch (error: any) {
            toast.error(error);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">

                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700">
                        <img src={SantaAvatar} className="w-18 h-18" />
                    </div>

                    <div>
                        <h2 className="text-xl font-bold dark:text-white">
                            {user?.fullName}
                        </h2>
                        <p className="text-sm text-slate-500">
                            @{user?.username}
                        </p>
                    </div>
                </div>

                {!isEditing ? (
                    <Button
                        variant="ghost"
                        onClick={() => setIsEditing(true)}
                        className="gap-2"
                    >
                        <Pencil size={16} />
                        Edit
                    </Button>
                ) : (
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            onClick={() => setIsEditing(false)}
                        >
                            <X size={16} />
                        </Button>

                        <Button
                            onClick={handleSubmit(onSubmit)}
                            isLoading={loading}
                            className="gap-2"
                        >
                            <Save size={16} />
                            Save
                        </Button>
                    </div>
                )}
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
                <Input
                    label="Full Name"
                    {...register("fullName")}
                    error={errors.fullName?.message}
                    disabled={!isEditing}
                />

                <Input
                    label="Username"
                    {...register("username")}
                    error={errors.username?.message}
                    disabled={!isEditing}
                />

                <Input
                    label="Email"
                    {...register("email")}
                    error={errors.email?.message}
                    disabled={!isEditing}
                />

                <Input
                    label="Academic Record"
                    {...register("academicRecord")}
                    error={errors.academicRecord?.message}
                    disabled={!isEditing}
                />

                {isEditing && (
                    <>
                        <Input
                            label="New Password"
                            type="password"
                            placeholder="Optional (At least 8 characters)"
                            {...register("password")}
                            error={errors.password?.message}
                        />

                        <Input
                            label="Confirm Password"
                            type="password"
                            {...register("confirmPassword")}
                            error={errors.confirmPassword?.message}
                        />
                        <p className="text-xs text-slate-500 ml-1">
                            Leave it empty if you don't want to change your password.
                        </p>
                    </>
                )}
            </form>
        </div>
    );
};