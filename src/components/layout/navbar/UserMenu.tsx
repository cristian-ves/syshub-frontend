import { LogOut } from 'lucide-react';
import { Button } from '../../common';
import { useAppDispatch, useAppSelector } from '../../../store';
import { logout } from '../../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export const UserMenu = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className="flex items-center gap-4 pl-4 border-l border-slate-200 dark:border-slate-700">
            <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-bold dark:text-white leading-none">
                    {user?.username}
                </span>
                <span className="text-[10px] font-bold text-brand-pink uppercase tracking-widest mt-1">
                    {user?.role?.replace('ROLE_', '')}
                </span>
            </div>
            <Button
                variant="ghost"
                className="!px-3 text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400"
                onClick={handleLogout}
            >
                <LogOut className="h-5 w-5" />
            </Button>
        </div>
    );
};