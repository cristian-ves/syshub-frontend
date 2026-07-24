import React, { useState } from 'react';
import { authService } from '../services/auth.service';
import { Input } from '../../../components/common/Input';
import { Button } from '../../../components/common/Button';
import { ErrorModal } from '../../../components/common/ErrorModal';
import { toast } from 'sonner';

export const ForgotPasswordForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg(null);

        try {
            await authService.forgotPassword(email);
            setIsSent(true);
            toast.success("Email sent!");
        } catch (error: any) {

            setErrorMsg(error);
        } finally {
            setLoading(false);
        }
    };

    if (isSent) {
        return (
            <div className="text-center space-y-4 animate-in fade-in duration-500">
                <p className="text-slate-600 dark:text-slate-400 font-medium">
                    We have sent the instructions to: <br />
                    <span className="text-slate-900 dark:text-white font-bold">{email}</span>
                </p>
                <p className="text-sm text-slate-500">
                    If you don't receive it within a few minutes, try again.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full space-y-6">
            <form onSubmit={onSubmit} className="space-y-4">
                <Input
                    label="Email"
                    type="email"
                    placeholder="your-email@cunoc.edu.gt"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Button
                    type="submit"
                    className="w-full"
                    isLoading={loading}
                >
                    Send instructions
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