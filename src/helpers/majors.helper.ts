export const MAJORS = [
    { id: 1, name: "Computer Science and Systems Engineering" },
    { id: 2, name: "Mechanical Engineering" },
    { id: 3, name: "Industrial Mechanical Engineering" },
    { id: 4, name: "Civil Engineering" },
    { id: 5, name: "Industrial Engineering" },
];

export const getMajorName = (id: number) => {
    return MAJORS.find((c) => c.id === id)?.name || "Not assigned";
};
