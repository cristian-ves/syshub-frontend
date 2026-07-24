export const CARRERAS = [
    { id: 1, nombre: "Computer Science and Systems Engineering" },
    { id: 2, nombre: "Mechanical Engineering" },
    { id: 3, nombre: "Industrial Mechanical Engineering" },
    { id: 4, nombre: "Civil Engineering" },
    { id: 5, nombre: "Industrial Engineering" },
];

export const getCarreraNombre = (id: number) => {
    return CARRERAS.find((c) => c.id === id)?.nombre || "Not assigned";
};
