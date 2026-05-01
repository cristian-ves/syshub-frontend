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
        const payload = { ...data };
        if (!payload.password) delete payload.password;

        const result = await dispatch(
            updateUserAction({ id: user.id, data: payload })
        );

        if (updateUserAction.fulfilled.match(result)) {
            setIsEditing(false);
            form.reset(data);
        }
        setIsLoading(false);
    };

    const handleDelete = async () => {
        if (
            !window.confirm(
                `¿Seguro que deseas eliminar a ${user.nombreCompleto}?`
            )
        )
            return;
        dispatch(deleteUserAction(user.id));
    };

    return {
        ...form,
        isEditing,
        setIsEditing,
        isLoading,
        handleDelete,
        onSubmit: form.handleSubmit(handleUpdate),
    };
};
