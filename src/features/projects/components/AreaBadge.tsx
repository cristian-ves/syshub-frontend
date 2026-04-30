export const AreaBadge = ({ name, color }: { name: string, color: string }) => (
    <span
        className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border"
        style={{
            backgroundColor: `${color}15`,
            color: color,
            borderColor: `${color}40`
        }}
    >
        {name}
    </span>
);