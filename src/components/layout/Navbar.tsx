import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { useAppSelector } from '../../store';
import { ThemeToggle, Button } from '../common';
import { NavLinks } from './navbar/NavLinks';
import { UserMenu } from './navbar/UserMenu';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    return (
        <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-50 transition-colors shadow-sm shadow-slate-200/50 dark:shadow-none">
            <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <img src={logo} alt="Logo" className="h-9 w-auto" />
                <span className="text-xl font-black text-slate-950 dark:text-white tracking-tighter">sys<span className="text-brand-blue">hub</span></span>
            </Link>

            {isAuthenticated && <NavLinks />}

            <div className="flex items-center gap-4">
                <ThemeToggle />
                {isAuthenticated ? <UserMenu /> : (
                    <div className="flex gap-2">
                        <Button variant="ghost" onClick={() => navigate('/login')}>Iniciar Sesión</Button>
                        <Button onClick={() => navigate('/register')}>Empezar</Button>
                    </div>
                )}
            </div>
        </nav>
    );
};