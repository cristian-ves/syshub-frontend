import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../common';
import { NAV_ITEMS } from './nav-config';
import { useAppSelector } from '../../../store';

export const NavLinks = ({ className = "" }: { className?: string }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = (path: string) => location.pathname.startsWith(path);

    const { user } = useAppSelector(state => state.auth);

    return (
        <div className={`flex gap-2 ${className}`}>
            {NAV_ITEMS.map((item) => {
                const hasPermission = !item.roles || (user?.role && item.roles.includes(user.role));

                if (!hasPermission) return null;

                return (
                    <Button
                        key={item.path}
                        variant="ghost"
                        onClick={() => navigate(item.path)}
                        className={`relative w-full md:w-auto transition-all h-9 px-4 rounded-full ${isActive(item.path)
                            ? 'text-brand-blue dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20 font-bold'
                            : 'text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                    >
                        {item.name}
                        {isActive(item.path) && (
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-blue rounded-full md:block hidden" />
                        )}
                    </Button>
                );
            })}
        </div>
    );
};