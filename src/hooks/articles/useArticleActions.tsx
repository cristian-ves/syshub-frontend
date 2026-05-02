import { toast } from "sonner";
import { useAppDispatch } from "../../store";
import {
    voteArticleThunk,
    toggleFavoriteThunk,
} from "../../store/slices/articleSlice";
import { Heart, HeartOff } from "lucide-react";

export const useArticleActions = () => {
    const dispatch = useAppDispatch();

    const handleVote = (id: number, vote: number) => {
        dispatch(voteArticleThunk({ id, newVote: vote }));
    };

    const handleFavorite = (id: number, isCurrentlyFavorite: boolean) => {

        dispatch(toggleFavoriteThunk(id));

        if (isCurrentlyFavorite) {
            toast.info("Artículo eliminado de tus favoritos", {
                icon: <HeartOff size={16} className="text-slate-500" />
            });
        } else {
            toast.success("Artículo guardado en tus favoritos", {
                icon: <Heart size={16} className="text-red-500 fill-red-500" />,
            });
        }
    };

    return {
        vote: handleVote,
        toggleFavorite: handleFavorite,
    };
};
