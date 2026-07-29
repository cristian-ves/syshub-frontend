export const downloadFile = async (fileUrl: string, originalName: string) => {
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error("Failed to download file");

    const blob = await response.blob();
    const objectUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = objectUrl;
    link.setAttribute("download", originalName);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(objectUrl);
};
