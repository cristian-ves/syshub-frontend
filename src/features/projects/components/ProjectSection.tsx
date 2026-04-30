export const ProjectSection = ({ icon, title, children, className = "" }: { icon?: React.ReactNode, title: string, children: React.ReactNode, className?: string }) => (
    <section className={className}>
        <h4 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            {icon} {title}
        </h4>
        {children}
    </section>
);