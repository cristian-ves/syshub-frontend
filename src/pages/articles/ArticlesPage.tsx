import React from "react";
import { BookOpenText, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../store";
import { Badge, Button } from "../../components/common";
import { useArticles } from "../../hooks/articles/useArticles";
import { ArticleList } from "../../features/articles/components/ArticleList";

export const ArticlesPage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.auth);

    const {
        articles,
        loading,
        totalPages,
        currentPage,
        setFilters
    } = useArticles();

    return (
        <div className="flex-grow flex flex-col w-full max-w-6xl mx-auto px-6 md:px-12 py-10">
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-2xl">
                    <Badge>Centro de Conocimiento</Badge>

                    <h1 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white mt-4 leading-tight">
                        Explora el material de <br />
                        aprendizaje de <span className="text-brand-blue">SysHub</span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg font-medium">
                        Tutoriales, guías y recursos técnicos creados por la comunidad para la comunidad.
                    </p>
                </div>

                {(user?.role === "ROLE_AUXILIAR" || user?.role === "ROLE_ADMIN") && (
                    <Button
                        className="gap-2 shadow-lg shadow-brand-blue/20"
                        onClick={() => navigate("/articles/create")}
                    >
                        <Plus size={18} />
                        Crear Artículo
                    </Button>
                )}
            </header>

            {/* ArticleFilters
            */}

            <div className="flex-grow mt-8">
                <ArticleList
                    articles={articles}
                    loading={loading}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setFilters({ page })}
                    emptyIcon={<BookOpenText size={32} className="text-slate-400" />}
                    emptyTitle="No se encontraron artículos"
                    emptySubtitle="Sé el primero en compartir conocimiento o intenta ajustar los filtros."
                    emptyActionPath={(user?.role === "ROLE_AUXILIAR" || user?.role === "ROLE_ADMIN") ? "/articles/create" : undefined}
                />
            </div>
        </div>
    );
};