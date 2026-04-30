import { Star } from 'lucide-react';

export const FeaturedBadge = ({ full = false }: { full?: boolean }) => (
    <span className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400 dark:bg-amber-500 text-amber-950 dark:text-slate-950 text-[10px] font-black uppercase tracking-wider border border-amber-500/20 shadow-sm
        ${full ? '' : 'shadow-lg'}
    `}>
        <Star size={12} fill="currentColor" />
        {full ? 'Proyecto Destacado' : 'Destacado'}
    </span>
);