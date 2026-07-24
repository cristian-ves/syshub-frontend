import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { Button, Badge } from '../../components/common';
import { useAppSelector } from '../../store';

export const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    return (
        <div className="h-full flex items-center justify-center p-6">

            <div className="grow flex w-full">
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center my-auto w-full">
                    <div>
                        <Badge>Engineering ecosystem</Badge>
                        <h1 className="text-5xl md:text-7xl leading-[1.1] dark:text-white">
                            Focus on <span className="text-brand-blue">learning</span>, we do the rest.
                        </h1>
                        <p className="mt-8 md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl font-medium">
                            SysHub is the modular platform designed for the next generation of{' '}
                            <span className="text-brand-pink font-bold">CUNOC</span> engineers.
                            Centralize your courses, forums, and projects in one place.
                        </p>
                        <div className="mt-12 flex flex-col sm:flex-row gap-5">
                            {isAuthenticated ?
                                (<Button className="text-lg py-4 px-10" onClick={() => navigate('/profile')}>
                                    View my profile
                                </Button>) :
                                (<Button className="text-lg py-4 px-10" onClick={() => navigate('/register')}>
                                    Create Account
                                </Button>)
                            }
                        </div>
                    </div>

                    <div className="flex justify-center relative">
                        <div className="absolute inset-0 bg-brand-blue/10 blur-[120px] rounded-full"></div>
                        <img
                            src={logo}
                            alt="Branding"
                            className="w-48 sm:w-64 md:w-80 h-auto drop-shadow-2xl dark:brightness-110"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};