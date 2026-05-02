import React from 'react';
import { Bookmark, Loader2, BookX } from 'lucide-react';
import { ArticleCard } from '../../features/articles/components/ArticleCard';
import { Pagination } from '../../components/common/Pagination';
import { useFavorites } from '../../hooks/articles/useFavorites';


const LoadingState = () => (
    <div className="flex flex-col items-center justify-center py-24 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin mb-4 text-brand-blue" />
        <p className="font-medium text-sm">Cargando tu colección...</p>
    </div>
);

const ErrorState = ({ error, onRetry }: { error: string, onRetry: () => void }) => (
    <div className="py-16 mt-8 text-center bg-red-50/50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/20">
        <p className="font-semibold text-red-600 dark:text-red-400">{error}</p>
        <button
            onClick={onRetry}
            className="mt-4 text-sm font-bold text-brand-blue hover:text-brand-blue/80 transition-colors"
        >
            Intentar de nuevo
        </button>
    </div>
);

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-24 bg-slate-50/50 dark:bg-slate-800/20 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700/50">
        <div className="w-16 h-16 mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
            <BookX size={28} />
        </div>
        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">Tu colección está vacía</h3>
        <p className="text-slate-500 mt-2 max-w-sm text-center text-sm">
            Explora la plataforma y guarda los artículos que te parezcan interesantes para leerlos después.
        </p>
    </div>
);



export const MyFavoriteArticles: React.FC = () => {
    const { items, loading, currentPage, totalPages, error, handlePageChange, retry } = useFavorites();

    if (loading && items.length === 0) return <LoadingState />;
    if (error) return <ErrorState error={error} onRetry={retry} />;

    return (
        <div className="w-full animate-in fade-in duration-500">
            <header className="mb-10 pl-2">
                <div className="flex items-center gap-2.5 mb-1.5">
                    <Bookmark size={22} className="text-brand-blue" />
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                        Lecturas Guardadas
                    </h1>
                </div>
                <p className="text-slate-500 font-medium text-sm ml-8">
                    Tu colección personal de artículos para consultar en cualquier momento.
                </p>
            </header>

            {items.length === 0 ? (
                <EmptyState />
            ) : (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {items.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="mt-14 flex justify-center">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </>
            )
            }
        </div >
    );
};