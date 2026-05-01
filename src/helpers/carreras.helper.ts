export const CARRERAS = [
    { id: 1, nombre: "Ingeniería en Ciencias y Sistemas" },
    { id: 2, nombre: "Ingeniería Mecánica" },
    { id: 3, nombre: "Ingeniería Mecánica Industrial" },
    { id: 4, nombre: "Ingeniería Civil" },
    { id: 5, nombre: "Ingeniería Industrial" },
];

export const getCarreraNombre = (id: number) => {
    return CARRERAS.find((c) => c.id === id)?.nombre || "No asignada";
};
