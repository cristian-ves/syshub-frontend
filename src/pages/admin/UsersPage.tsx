import { Plus, Users, Loader2 } from "lucide-react";
import { Button, Badge, Pagination } from "../../components/common";
import { UserCard } from "../../features/admin/components/UserCard";
import { useAdminUsers } from "../../hooks/admin/useAdminUsers";
import { useNavigate } from "react-router-dom";

export const UsersPage = () => {
    const navigate = useNavigate();
    const { users, loading, totalPages, currentPage, fetchPage } = useAdminUsers();

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-2xl">
                    <Badge>Panel de Administración</Badge>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white mt-4">
                        Gestiona la comunidad <br />
                        de <span className="text-brand-blue">SysHub</span>
                    </h1>
                </div>

                <Button className="gap-2 shadow-xl shadow-brand-blue/20 py-6 px-8 rounded-2xl" onClick={() => navigate("/users/create")}>
                    <Plus size={20} />
                    Crear Usuario
                </Button>
            </header>

            {loading && users.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-10 h-10 text-brand-blue animate-spin mb-4" />
                    <p className="text-slate-500 font-medium">Cargando usuarios...</p>
                </div>
            ) : (
                <div className="space-y-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {users.map((u) => (
                            <UserCard key={u.id} user={u} />
                        ))}
                    </div>

                    {!loading && users.length === 0 && (
                        <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-800">
                            <Users className="mx-auto text-slate-300 mb-4" size={48} />
                            <p className="text-slate-500 font-medium">No hay usuarios registrados.</p>
                        </div>
                    )}

                    {totalPages > 1 && (
                        <div className="pt-6">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={fetchPage}
                                isLoading={loading}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};