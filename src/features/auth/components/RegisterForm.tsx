import React, { useState } from 'react';
import { Select, Button, Input } from '../../../components/common';
import type { RegisterRequestDTO } from '../../../types/auth.types';

interface RegisterFormData extends RegisterRequestDTO {
    confirmPassword: string;
}

const RegisterForm: React.FC = () => {
    const [formData, setFormData] = useState<RegisterFormData>({
        username: '',
        email: '',
        password: '',
        nombreCompleto: '',
        registroAcademico: '',
        idCarrera: 1,
        confirmPassword: ''
    });

    const carreras = [
        { id: 1, nombre: "Ingeniería en Ciencias y Sistemas" },
        { id: 2, nombre: "Ingeniería Mecánica" },
        { id: 3, nombre: "Ingeniería Mecánica Industrial" },
        { id: 4, nombre: "Ingeniería Civil" },
        { id: 5, nombre: "Ingeniería Industrial" },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'idCarrera' ? parseInt(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Datos listos para DTO:', formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar"
        >
            <Input
                label="Nombre Completo"
                name="nombreCompleto"
                placeholder="Ej. Alejandro Pérez"
                value={formData.nombreCompleto}
                onChange={handleChange}
                required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="Usuario"
                    name="username"
                    placeholder="ale_perez"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Registro Académico"
                    name="registroAcademico"
                    placeholder="202600000"
                    value={formData.registroAcademico}
                    onChange={handleChange}
                />
            </div>

            <Input
                label="Correo Electrónico"
                name="email"
                type="email"
                placeholder="estudiante@cunoc.edu.gt"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <Select
                label="Carrera"
                name="idCarrera"
                options={carreras}
                value={formData.idCarrera}
                onChange={handleChange}
                required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="Contraseña"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Confirmar"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
            </div>

            <Button type="submit" className="w-full py-4 mt-2">
                Crear Cuenta
            </Button>
        </form>
    );
};

export default RegisterForm;