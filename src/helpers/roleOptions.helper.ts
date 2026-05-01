export const ROLE_OPTIONS = [
    { id: 1, label: "Administrador", nombre: "ROLE_ADMIN" },
    { id: 2, label: "Auxiliar", nombre: "ROLE_AUXILIAR" },
    { id: 3, label: "Estudiante", nombre: "ROLE_STUDENT" },
];

export const getRoleLabel = (roleId: number) => {
    return ROLE_OPTIONS.find((r) => r.id === roleId)?.label || "Usuario";
};
