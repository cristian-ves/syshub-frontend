export interface NavItem {
    name: string;
    path: string;
    roles?: string[];
}

export const NAV_ITEMS: NavItem[] = [
    { name: "Mi Perfil", path: "/profile" },
    { name: "Proyectos", path: "/projects" },
    { name: "Articulos y blogs", path: "/articles" },
    { name: "Usuarios", path: "/users", roles: ["ROLE_ADMIN"] },
];
