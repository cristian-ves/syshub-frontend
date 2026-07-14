import { UserCircle, FolderKanban, Star, type LucideIcon } from "lucide-react";

interface ProfileTab {
    label: string;
    path: string;
    icon: LucideIcon;
}

export const PROFILE_TABS: ProfileTab[] = [
    { label: "Información Personal", path: "/profile/info", icon: UserCircle },
    { label: "Mis Proyectos", path: "/profile/projects", icon: FolderKanban },
    { label: "Mis articulos", path: "/profile/favorites", icon: Star },
];
