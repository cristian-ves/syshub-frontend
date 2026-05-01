import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { useAppDispatch } from "../../store";
import { createUserAction } from "../../store/slices/adminSlice";
import {
    createUserSchema,
    type CreateUserFormValues,
} from "../../features/admin/schemas/user-admin.schema";

export const useCreateUser = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const form = useForm<CreateUserFormValues>({
        resolver: zodResolver(createUserSchema) as any,
        defaultValues: {
            nombreCompleto: "",
            username: "",
            email: "",
            registroAcademico: "",
            enabled: true,
            rolId: 2,
            carreraId: 1,
            password: "",
        },
    });

    const handleFormSubmit = async (data: CreateUserFormValues) => {
        try {
            await dispatch(createUserAction(data)).unwrap();
            toast.success("Usuario creado exitosamente");
            navigate("/users");
        } catch (error: any) {
            setErrorMsg(error);
        }
    };

    return {
        ...form,
        onSubmit: form.handleSubmit(handleFormSubmit),
        isSubmitting: form.formState.isSubmitting,
        errorMsg,
        setErrorMsg,
    };
};
