// src/App.tsx
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { Toaster } from 'sonner';

export const App = () => {
    return (
        <>
            <Toaster position="top-right" richColors closeButton />
            <RouterProvider router={router} />
        </>
    );
};

export default App;