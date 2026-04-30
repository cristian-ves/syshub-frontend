import logo from '../assets/logo.svg';
import { ResetPasswordForm } from '../features/auth/components/ResetPasswordForm';

export const ResetPasswordPage: React.FC = () => {

    return (
        <div className="h-full flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-8">
                <div className="flex flex-col items-center mb-8">
                    <img src={logo} alt="Logo" className="h-10 w-auto mb-6" />
                    <h1 className="text-2xl font-black dark:text-white text-center">Nueva contraseña</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-center mt-2">
                        Ingresa tu nueva clave de acceso para recuperar tu cuenta.
                    </p>
                </div>

                <ResetPasswordForm />
            </div>
        </div>
    );
}; 