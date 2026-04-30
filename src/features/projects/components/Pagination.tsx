import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../../components/common';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isLoading?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, isLoading }) => {
    if (totalPages <= 1) return null;
    const pages = Array.from({ length: totalPages }, (_, i) => i);

    return (
        <nav className="mt-16 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">

                <Button
                    variant="ghost"
                    disabled={currentPage === 0 || isLoading}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="!p-2 !px-2 !rounded-xl"
                >
                    <ChevronLeft size={20} />
                </Button>

                <div className="flex items-center gap-1">
                    {pages.map((page) => (
                        <Button
                            key={page}
                            variant={currentPage === page ? 'primary' : 'ghost'}
                            onClick={() => onPageChange(page)}
                            disabled={isLoading}
                            className={`!min-w-[40px] !h-10 !px-0 !py-0 !rounded-xl text-sm ${currentPage === page ? 'shadow-md' : ''
                                }`}
                        >
                            {page + 1}
                        </Button>
                    ))}
                </div>

                <Button
                    variant="ghost"
                    disabled={currentPage + 1 === totalPages || isLoading}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="!p-2 !px-2 !rounded-xl"
                >
                    <ChevronRight size={20} />
                </Button>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
                Página {currentPage + 1} de {totalPages}
            </p>
        </nav>
    );
};