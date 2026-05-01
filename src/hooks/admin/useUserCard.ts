import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    userAdminSchema,
    type UserAdminFormValues,
} from "../../features/admin/schemas/user-admin.schema";
import { useAppDispatch } from "../../store";
import {
    deleteUserAction,
    updateUserAction,
} from "../../store/slices/adminSlice";

export const useUserCard = (user: any) => {
    const dispatch = useAppDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const form = useForm<UserAdminFormValues>({
        resolver: zodResolver(userAdminSchema) as any,
        defaultValues: {
            nombreCompleto: user.nombreCompleto,
            username: user.username,
            email: user.email,
            registroAcademico: user.registroAcademico || "",
            rolId: user.roleId,
            carreraId: user.carreraId,
            enabled: user.enabled,
            password: "",
        },
    });

    const handleUpdate = async (data: UserAdminFormValues) => {
        setIsLoading(true);
        try {
            const payload = { ...data };
            if (!payload.password) delete payload.password;

            await dispatch(
                updateUserAction({ id: user.id, data: payload })
            ).unwrap();
            setIsEditing(false);
        } catch (error: any) {
            setErrorMsg(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (
            !window.confirm(
                `¿Seguro que deseas eliminar a ${user.nombreCompleto}?`
            )
        )
            return;

        try {
            await dispatch(deleteUserAction(user.id)).unwrap();
        } catch (error: any) {
            setErrorMsg(error);
        }
    };

    return {
        ...form,
        isEditing,
        setIsEditing,
        isLoading,
        errorMsg,
        setErrorMsg,
        handleDelete,
        onSubmit: form.handleSubmit(handleUpdate),
    };
};
