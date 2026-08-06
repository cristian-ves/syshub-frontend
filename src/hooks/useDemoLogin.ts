import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppDispatch } from "../store";
import { loginUser } from "../store/slices/authSlice";

const DEMO_CREDENTIALS = {
    admin: { username: "demo_admin", password: "password" },
    assistant: { username: "demo_assistant", password: "password" },
    student: { username: "demo_student", password: "password" },
} as const;

export type DemoRole = keyof typeof DEMO_CREDENTIALS;

export const useDemoLogin = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [loadingRole, setLoadingRole] = useState<DemoRole | null>(null);

    const loginAsDemo = async (role: DemoRole) => {
        setLoadingRole(role);
        try {
            const response = await dispatch(
                loginUser(DEMO_CREDENTIALS[role])
            ).unwrap();
            toast.success(
                `Logged in as ${response.username}. Welcome to the demo!`
            );
            navigate("/profile");
        } catch (error: any) {
            toast.error(error || "Could not start the demo session");
        } finally {
            setLoadingRole(null);
        }
    };

    return { loginAsDemo, loadingRole };
};
