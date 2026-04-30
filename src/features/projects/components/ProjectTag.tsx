import type { Tag } from '../../../types/project.types';

export const ProjectTag = ({ tag }: { tag: Tag }) => (
    <span
        style={{
            backgroundColor: `${tag.color}26`,
            color: tag.color,
            borderColor: `${tag.color}4d`
        }}
        className="text-[10px] px-2 py-1 rounded-md font-bold uppercase border transition-all hover:brightness-110"
    >
        #{tag.nombre}
    </span>
);