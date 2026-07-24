import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
import { useAppSelector } from '../../../store';
import { ThemeToggle, Button } from '../../common';
import { NavLinks } from '../navbar/NavLinks';
import { UserMenu } from '../navbar/UserMenu';

export const Navbar = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className=" w-full flex items-center justify-between px-4 md:px-12 py-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-50 transition-colors shadow-sm shadow-slate-200/50 dark:shadow-none">

            <Link
                to={isAuthenticated ? "/dashboard" : "/"}
                className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity shrink-0"
                onClick={closeMenu}
            >
                <img src={logo} alt="Logo" className="h-8 md:h-9 w-auto" />
                <span className="text-lg md:text-xl font-black text-slate-950 dark:text-white tracking-tighter">
                    sys<span className="text-brand-blue">hub</span>
                </span>
            </Link>

            {isAuthenticated && (
                <div className="hidden md:flex flex-1 justify-center">
                    <NavLinks className="flex-row items-center" />
                </div>
            )}

            <div className="flex items-center gap-2 md:gap-4">
                <ThemeToggle />

                <div className="hidden md:flex items-center gap-2">
                    {isAuthenticated ? <UserMenu /> : (
                        <>
                            <Button variant="ghost" onClick={() => navigate('/login')}>Log In</Button>
                            <Button onClick={() => navigate('/register')}>Get Started</Button>
                        </>
                    )}
                </div>

                <div className="flex md:hidden items-center gap-2">
                    {isAuthenticated && <UserMenu />}
                    <button
                        onClick={toggleMenu}
                        className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors focus:outline-none"
                    >
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        )}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-xl md:hidden flex flex-col p-4 gap-4 z-40">
                    {isAuthenticated ? (
                        <div onClick={closeMenu}>
                            <NavLinks className="flex-col w-full" />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <Button
                                variant="ghost"
                                className="w-full justify-center"
                                onClick={() => { navigate('/login'); closeMenu(); }}
                            >
                                Log In
                            </Button>
                            <Button
                                className="w-full justify-center"
                                onClick={() => { navigate('/register'); closeMenu(); }}
                            >
                                Get Started
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};