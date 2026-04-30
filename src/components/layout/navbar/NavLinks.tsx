import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../common';
import { NAV_ITEMS } from './nav-config';

export const NavLinks = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="hidden md:flex items-center gap-2">
            {NAV_ITEMS.map((item) => (
                <Button
                    key={item.path}
                    variant="ghost"
                    onClick={() => navigate(item.path)}
                    className={`relative transition-all ${isActive(item.path)
                            ? 'text-brand-blue dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20'
                            : 'text-slate-600 dark:text-slate-400'
                        }`}
                >
                    {item.name}
                    {isActive(item.path) && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-blue rounded-full" />
                    )}
                </Button>
            ))}
        </div>
    );
};