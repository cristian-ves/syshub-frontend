export const usePagination = (onChange: (page: number) => void) => {
    const handlePageChange = (page: number) => {
        onChange(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return { handlePageChange };
};
