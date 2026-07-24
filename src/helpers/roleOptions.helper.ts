export const ROLE_OPTIONS = [
    { id: 1, label: "Admin", nombre: "ROLE_ADMIN" },
    { id: 2, label: "Assistant", nombre: "ROLE_ASSISTANT" },
    { id: 3, label: "Student", nombre: "ROLE_STUDENT" },
];

export const getRoleLabel = (roleId: number) => {
    return ROLE_OPTIONS.find((r) => r.id === roleId)?.label || "User";
};
