import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../store";
import {
    deleteUserAction,
    updateUserAction,
} from "../../store/slices/adminSlice";
import {
    updateUserSchema,
    type UpdateUserFormValues,
} from "../../features/admin/schemas/user-admin.schema";

export const useUserCard = (user: any) => {
    const dispatch = useAppDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const form = useForm<UpdateUserFormValues>({
        resolver: zodResolver(updateUserSchema) as any,
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

    const handleUpdate = async (data: UpdateUserFormValues) => {
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
        setIsDeleting(true);
        try {
            await dispatch(deleteUserAction(user.id)).unwrap();
            setIsDeleteModalOpen(false);
        } catch (error: any) {
            setErrorMsg(error);
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        ...form,
        isEditing,
        setIsEditing,
        isLoading,
        errorMsg,
        setErrorMsg,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        isDeleting,
        handleDelete,
        onSubmit: form.handleSubmit(handleUpdate),
    };
};
