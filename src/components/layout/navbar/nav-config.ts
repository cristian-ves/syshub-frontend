export interface NavItem {
    name: string;
    path: string;
    roles?: string[];
}

export const NAV_ITEMS: NavItem[] = [
    { name: "My profile", path: "/profile" },
    { name: "Projects", path: "/projects" },
    { name: "Articles and blogs", path: "/articles" },
    { name: "Users", path: "/users", roles: ["ROLE_ADMIN"] },
];
