import { UserCircle, FolderKanban, Star, type LucideIcon } from "lucide-react";

interface ProfileTab {
    label: string;
    path: string;
    icon: LucideIcon;
}

export const PROFILE_TABS: ProfileTab[] = [
    { label: "Profile", path: "/profile/info", icon: UserCircle },
    { label: "My projects", path: "/profile/projects", icon: FolderKanban },
    { label: "My articles", path: "/profile/favorites", icon: Star },
];
