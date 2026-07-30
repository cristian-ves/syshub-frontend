export const ROLE_OPTIONS = [
    { id: 1, label: "Admin", name: "ROLE_ADMIN" },
    { id: 2, label: "Assistant", name: "ROLE_ASSISTANT" },
    { id: 3, label: "Student", name: "ROLE_STUDENT" },
];

const ROLE_DICTIONARY = ROLE_OPTIONS.reduce((acc, role) => {
    acc[role.id] = role.label;
    return acc;
}, {} as Record<number, string>);

export const getRoleLabel = (roleId: number) => {
    return ROLE_DICTIONARY[roleId] || "User";
};
