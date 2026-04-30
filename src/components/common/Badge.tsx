interface BadgeProps {
    children: React.ReactNode;
    className?: string;
    noMargin?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
    children,
    className = "",
    noMargin = false
}) => {
    return (
        <span className={`
            inline-flex items-center px-4 py-1.5 rounded-full bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 text-xs font-bold uppercase tracking-widest border border-pink-100 dark:border-pink-800
            ${noMargin ? '' : 'mb-6'} 
            ${className}
        `}>
            <span className="w-2 h-2 rounded-full bg-pink-500 mr-2 animate-pulse"></span>
            {children}
        </span>
    );
};